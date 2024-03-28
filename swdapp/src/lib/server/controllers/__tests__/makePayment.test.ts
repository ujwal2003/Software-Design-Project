import { beforeAll, expect, test, vi } from 'vitest';

import { makePaymentMethod } from '../profileController';
import type { MakePaymentRequest } from '$lib/server/customTypes/generalTypes';
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