import { beforeAll, expect, test, vi } from 'vitest';
import { reauthorizeUser, loginUser } from '../authController';
import type { GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
})

test('failure to reauthorize due to no token provided', async () => {
    const testReauthorizeResponse = {
        username: 'dummyUser1',
        refreshToken: ''
    };

    expect(await (await reauthorizeUser(testReauthorizeResponse)).json()).toEqual({
        success: false,
        message: 'no token provided'
    } as GeneralAPIResponse);
})

test('failure to reauthorize due refresh token being invalid', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testReauthorizeResponse = {
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken + 'abcd'
    }

    expect(await (await reauthorizeUser(testReauthorizeResponse)).json()).toEqual({
        success: false,
        message: 'invalid token provided'
    } as GeneralAPIResponse);
})

test('succesful user reauthorization', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testReauthorizeResponse = {
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken
    }

    const res = await (await reauthorizeUser(testReauthorizeResponse)).json();

    expect(res.success).toBeTruthy();
    expect(res.payload).toBeDefined();
    expect(res.newAccessToken).toBeTypeOf("string");
})

test('failure to reauthorize due to internal error', async () => {
    //@ts-expect-error
    expect(await (await reauthorizeUser()).json()).toEqual({
        success: false,
        message: "failed to authorize due to internal server error"
    } as GeneralAPIResponse);
})