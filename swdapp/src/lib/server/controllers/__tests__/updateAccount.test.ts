import { beforeAll, expect, test, vi } from 'vitest';

import { updateAccountData } from '../profileController';
import type { UpdateAccountRequest } from '$lib/server/customTypes/generalTypes';
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
})

test('successful account update test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: UpdateAccountRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken,
        firstName: "Bartholomew",
        lastName: "Da Third"
    }
    
    expect(await (await updateAccountData(testRequest)).json()).toEqual({
        success: true,
        message: "Account update successful"
    });
    

})

test('successful account update when profile is completely empty test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: UpdateAccountRequest = {
        username: 'dummyUser1',
        accessToken: loginRes.response.accessToken,
        firstName: "Bartholomew",
        lastName: "Da Third"
    }
    
    expect(await (await updateAccountData(testRequest)).json()).toEqual({
        success: true,
        message: "Account update successful"
    });
    

})