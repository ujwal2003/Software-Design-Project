import { expect, test, vi } from 'vitest';

import type { LoginFailure, LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';

test('succesful login for user', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });

    const res: LoginResponse<LoginSuccess> = await (await loginUser(testRequest)).json();

    expect(res.success).toBe(true);
    expect(Object.keys(res.response).length).toEqual(2);
    expect(res.response.accessToken).toBeTypeOf('string');
    expect(res.response.accessToken.length).toBeGreaterThan(0);
    expect(res.response.refreshToken).toBeTypeOf('string');
    expect(res.response.refreshToken.length).toBeGreaterThan(0);
})

test('unsuccesful login (user does not exist)', async () => {
    const testRequest: LoginRequest = {
        username: 'nonExistentUser',
        password: 'nonExistentPassword'
    }

    expect(await (await loginUser(testRequest)).json()).toEqual({
        success: false,
        response: {
            failType: 'invalid_user',
            message: 'User not found'
        }
    } as LoginResponse<LoginFailure>);
})

test('unsucessful login (wrong password)', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'wrongPassword'
    }

    expect(await (await loginUser(testRequest)).json()).toEqual({
        success: false,
        response: {
            failType: 'invalid_pass',
            message: `invalid password for user ${testRequest.username}`
        }
    } as LoginResponse<LoginFailure>);
})

test('authentication fails due to error or invalid info', async () => {
    // @ts-expect-error
    expect(await (await loginUser()).json()).toEqual({
        success: false,
        response: {
            failType: 'error',
            message: 'login failed due to internal server error'
        }
    } as LoginResponse<LoginFailure>);
})