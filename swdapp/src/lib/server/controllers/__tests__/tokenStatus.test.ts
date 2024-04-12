import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { accessTokenStatus, loginUser } from "../authController";

import * as UserService from '../../services/userService';
import * as AuthService from '../../services/authorizationService';
import type { LoginRequest, LoginResponse, LoginSuccess } from "$lib/server/customTypes/authTypes";
import * as bcrypt from "bcrypt";
import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes";

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

test('Access token is still valid', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest = {
        accessToken: loginRes.response.accessToken,
        refreshToken: loginRes.response.refreshToken
    };

    isRefTokenValidSpy.mockImplementation(async () => { return true; });

    const res = await accessTokenStatus(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.valid).toBeTruthy();
    expect(resJSON.message).toEqual('token is still valid');
    expect(resJSON.payload).toBeDefined();
});

test('Access token has expired', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest = {
        accessToken: loginRes.response.accessToken,
        refreshToken: loginRes.response.refreshToken + 'abcd'
    };

    isRefTokenValidSpy.mockImplementation(async () => { return false; });

    const res = await accessTokenStatus(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.valid).toBeFalsy();
    expect(resJSON.message).toEqual('token has expired');
});

test('Token verification failure', async () => {
    //@ts-expect-error
    expect(await (await accessTokenStatus()).json()).toEqual({
        success: false,
        message: "failed to verify token due to internal server error"
    } as GeneralAPIResponse);
});