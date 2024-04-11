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

test.skip('successful account update test', async () => {
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

test.skip('successful account update when profile is completely empty test', async () => {
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

test.skip('successful account update when payment is completely empty test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser2',
        password: 'unsecurePassword2'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: UpdateAccountRequest = {
        username: 'dummyUser2',
        accessToken: loginRes.response.accessToken,
        paymentUpdates: {
            cardName: 'new card'
        }
    }
    
    expect(await (await updateAccountData(testRequest)).json()).toEqual({
        success: true,
        message: "Account update successful"
    });
})

test.skip('failure to update account due to invalid access token', async () => {
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

test.skip('succesful payment information update', async () => {
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

test.skip('failure to update account due to internal error', async () => {
    //@ts-expect-error
    expect(await (await updateAccountData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
})

test.skip('failure due to user not found', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: UpdateAccountRequest = {
        username: 'dummyUserNewUser',
        accessToken: loginRes.response.accessToken,
        profileUpdates: {
            firstName: "fnameNew",
            lastName: "lnameNew"
        }
    }
    
    expect(await (await updateAccountData(testRequest)).json()).toEqual({
        success: false,
        message: "Account update failed"
    });
})