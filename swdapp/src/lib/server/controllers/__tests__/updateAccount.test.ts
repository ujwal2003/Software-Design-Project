import { beforeAll, expect, test, vi } from 'vitest';

import { updateAccountData } from '../profileController';
import type { GeneralAPIResponse, UnauthorizedResponse, UpdateAccountRequest } from '$lib/server/customTypes/generalTypes';
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
        profileUpdates: {
            firstName: "Bartholomew",
            lastName: "Da Third"
        }
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
        profileUpdates: {
            firstName: "Bartholomew",
            lastName: "Da Third"
        }
    }
    
    expect(await (await updateAccountData(testRequest)).json()).toEqual({
        success: true,
        message: "Account update successful"
    });
    

})

test('failure to update account due to invalid access token', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: UpdateAccountRequest = {
        username: 'dummyUser1',
        accessToken: loginRes.response.accessToken + 'abcd',
        profileUpdates: {
            firstName: "John",
            lastName: "Doe"
        }
    }

    expect(await (await updateAccountData(testRequest)).json()).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
})

test('succesful payment information update', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: UpdateAccountRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken,
        paymentUpdates: {
            cardName: "user 1's card",
            cvv: "123"
        }
    }

    expect(await (await updateAccountData(testRequest)).json()).toEqual({
        success: true,
        message: "Account update successful"
    } as GeneralAPIResponse);
})