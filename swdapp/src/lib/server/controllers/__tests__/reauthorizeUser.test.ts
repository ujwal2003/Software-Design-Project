import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { loginUser, reauthorizeUser } from "../authController";

import * as bcrypt from "bcrypt";
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes";
import type { LoginRequest, LoginResponse, LoginSuccess } from "$lib/server/customTypes/authTypes";

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');
const isRefTokenValidSpy = vi.spyOn(AuthService, 'isRefreshTokenValid');

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2',
        };
    });
});

afterAll(() => {
    userExistsSpy.mockRestore();
    getCredsSpy.mockRestore();
    addRefTokenSpy.mockRestore();
    isRefTokenValidSpy.mockRestore();
});

test('failure to reauthorize due to no token provided', async () => {
    const testRequest = {
        username: 'dummyUser',
        refreshToken: ''
    };

    expect(await (await reauthorizeUser(testRequest)).json()).toEqual({
        success: false,
        message: 'no token provided'
    } as GeneralAPIResponse);
});

test('failure to reauthorize due refresh token being invalid', async () => {
    const testRequest = {
        username: 'dummyUser',
        refreshToken: 'invalid_refresh_token'
    };

    isRefTokenValidSpy.mockImplementation(async () => { return false; });

    const res = await reauthorizeUser(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: false,
        message: 'invalid token provided'
    } as GeneralAPIResponse);
});

test('succesful user reauthorization', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest = {
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken
    };

    isRefTokenValidSpy.mockImplementation(async () => { return true; });

    const res = await reauthorizeUser(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.payload).toBeDefined();
    expect(resJSON.newAccessToken).toBeTypeOf('string');
});

test('failure to reauthorize due to internal error', async () => {
    //@ts-expect-error
    expect(await (await reauthorizeUser()).json()).toEqual({
        success: false,
        message: "failed to authorize due to internal server error"
    } as GeneralAPIResponse);
});