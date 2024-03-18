import type { LogOutRequest, LogOutResponse, LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { beforeAll, expect, test, vi } from 'vitest';
import { logOutUser, loginUser } from '../authController';

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
})

test('succesful user logout', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testLogOutRequest: LogOutRequest = {
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken
    }

    expect(await (await logOutUser(testLogOutRequest)).json()).toEqual({
        success: true,
        message: `Successfully logged out user ${testLogOutRequest.username}`
    } as LogOutResponse);
})