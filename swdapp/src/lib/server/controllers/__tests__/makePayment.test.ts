import { beforeAll, expect, test, vi } from 'vitest';

import { makePaymentMethod } from '../profileController';
import type { GeneralAPIResponse, MakePaymentRequest, UnauthorizedResponse } from '$lib/server/customTypes/generalTypes';
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

test('successful payment test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: MakePaymentRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken,
        company: "Exxon",
        price: 30
    }
    
    expect(await (await makePaymentMethod(testRequest)).json()).toEqual({
        success: true,
        message: "Payment successful"
    });
    

})

test('company not found payment test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: MakePaymentRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken,
        company: "NEW FANCY COMPANY",
        price: 30
    }
    
    expect(await (await makePaymentMethod(testRequest)).json()).toEqual({
        success: false,
        message: "Payment failed"
    });
})

test('unsuccesful payment due to invalid payment', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: MakePaymentRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken + 'abcd',
        company: "Exxon",
        price: 30
    }

    expect(await (await makePaymentMethod(testRequest)).json()).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
})

test('unsuccesful payment due to internal error', async () => {
    //@ts-expect-error
    expect(await (await makePaymentMethod()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
})