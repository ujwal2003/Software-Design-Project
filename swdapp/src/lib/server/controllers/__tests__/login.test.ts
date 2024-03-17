import { expect, test } from 'vitest';

import type { LoginFailure, LoginRequest, LoginResponse } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';

test.todo('succesful login for user', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }
})

test.todo('unsuccesful login (user does not exist)', async () => {
    const testRequest: LoginRequest = {
        username: 'nonExistentUser',
        password: 'nonExistentPassword'
    }
})

test.todo('unsucessful login (wrong password)', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'wrongPassword'
    }
})

test.todo('authentication fails due to error or invalid info', async () => {
    // @ts-expect-error
    expect(await (await loginUser()).json()).toEqual({
        success: false,
        response: {
            failType: 'error',
            message: "Request failed due to error"
        }
    } as LoginResponse<LoginFailure>)
})