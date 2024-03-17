import { expect, test } from 'vitest';

import type { LoginFailure, LoginRequest, LoginResponse } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';

test.todo('succesful login for user', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }
})

test.skip('unsuccesful login (user does not exist)', async () => {
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

test.skip('unsucessful login (wrong password)', async () => {
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

test.skip('authentication fails due to error or invalid info', async () => {
    // @ts-expect-error
    expect(await (await loginUser()).json()).toEqual({
        success: false,
        response: {
            failType: 'error',
            message: 'login failed due to internal server error'
        }
    } as LoginResponse<LoginFailure>);
})