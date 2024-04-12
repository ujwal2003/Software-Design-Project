import type { LoginFailure, LoginRequest, LoginResponse, LoginSuccess } from "$lib/server/customTypes/authTypes";
import { afterAll, beforeAll, expect, test, vi } from "vitest";

import * as bcrypt from "bcrypt";

import * as UserService from '../../services/userService';
import * as AuthService from '../../services/authorizationService';
import { loginUser } from "../authController";

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');

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
});

test('login fails because user does not exist', async () => {
    const testRequest: LoginRequest = {
        username: 'unregisteredUser',
        password: 'unhashedPass'
    }

    userExistsSpy.mockImplementation(async () => { return false; });
    getCredsSpy.mockImplementation(async () => { return undefined; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const res = await loginUser(testRequest);
    const resJSON: LoginResponse<LoginFailure> = await res.json();

    expect(resJSON).toEqual({
        success: false,
        response: {
            failType: 'invalid_user',
            message: 'User not found'
        }
    } as LoginResponse<LoginFailure>);
});

test('login fails because a wrong password was entered', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser',
        password: 'pass1'
    };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    
    getCredsSpy.mockImplementation(async () => {
        return {
            username: 'dummyUser',
            encryptedPass: hashedPass
        }
    });
    
    addRefTokenSpy.mockImplementation(async () => { return; });

    const res = await loginUser({ username: 'dummyUser', password: 'wrongPassword' } as LoginRequest);
    const resJSON: LoginResponse<LoginFailure> = await res.json();

    expect(resJSON).toEqual({
        success: false,
        response: {
            failType: 'invalid_pass',
            message: `invalid password for user ${testRequest.username}`
        }
    } as LoginResponse<LoginFailure>);
});

test('authentication fials due to internal error', async () => {
    //@ts-expect-error
    expect(await (await loginUser()).json()).toEqual({
        success: false,
        response: {
            failType: 'error',
            message: 'login failed due to internal server error'
        }
    } as LoginResponse<LoginFailure>);
});

test('succesful user login', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser',
        password: 'pass1'
    };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => {
        return true;
    });

    getCredsSpy.mockImplementation(async () => {
        return {
            username: 'user1',
            encryptedPass: hashedPass
        };
    });

    addRefTokenSpy.mockImplementation(async () => { return; });


    const res = await loginUser(testRequest);
    const resJSON: LoginResponse<LoginSuccess> = await res.json();
    
    expect(resJSON.success).toBeTruthy();
    expect(Object.keys(resJSON.response).length).toEqual(2);
    expect(resJSON.response.accessToken).toBeTypeOf('string');
    expect(resJSON.response.accessToken.length).toBeGreaterThan(0);
    expect(resJSON.response.refreshToken).toBeTypeOf('string');
    expect(resJSON.response.refreshToken.length).toBeGreaterThan(0);
});