import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { beforeAll, expect, test, vi } from 'vitest';
import { accessTokenStatus, loginUser } from '../authController';
import type { GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
})

test('Access token is still valid', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testTokenStatusRequest = {
        accessToken: loginRes.response.accessToken,
        refreshToken: loginRes.response.refreshToken
    }

    const res = await (await accessTokenStatus(testTokenStatusRequest)).json();

    expect(res.success).toBe(true);
    expect(res.valid).toBe(true);
    expect(res.message).toEqual('token is still valid');
    expect(res.payload).toBeDefined();
})

test('Access token is invalid', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testTokenStatusRequest = {
        accessToken: loginRes.response.accessToken,
        refreshToken: loginRes.response.refreshToken + 'abcd'
    }

    const res = await (await accessTokenStatus(testTokenStatusRequest)).json();

    expect(res.success).toBeTruthy();
    expect(res.valid).toBeFalsy();
    expect(res.message).toEqual('token has expired');
})

test('Token verification failure', async () => {
    //@ts-expect-error
    expect(await (await accessTokenStatus()).json()).toEqual({
        success: false,
        message: "failed to verify token due to internal server error"
    } as GeneralAPIResponse);
})