import { beforeAll, expect, test, vi } from 'vitest';

import { generateQuoteData } from '../profileController';
import type { GenerateQuoteRequest, GenerateQuoteResponse, GeneralAPIResponse, UnauthorizedResponse } from '$lib/server/customTypes/generalTypes';
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

test('successful quote generation test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser4',
        password: 'unsecurePassword4'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    
    const testRequest: GenerateQuoteRequest = {
        username: 'dummyUser4',
        accessToken: loginRes.response.accessToken,
        gallonsRequested: 5,
        deliveryDate: "2023-10-21",
        loc: "Houston"
    }

    const quoteResponse = await (await generateQuoteData(testRequest)).json();

    const expectedResponse = {
        success: true,
        gallonsRequested: 5
    };

    expect({
        success: quoteResponse.success,
        gallonsRequested: quoteResponse.gallonsRequested,
    }).toEqual(expectedResponse);
});

test('missing parameters quote generation test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser4',
        password: 'unsecurePassword4'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: Partial<GenerateQuoteRequest> = {
        username: 'dummyUser4',
        accessToken: loginRes.response.accessToken,
        deliveryDate: "2023-10-20",
        loc: "Houston"
    }

    const quoteResponse = await (await generateQuoteData(testRequest as GenerateQuoteRequest)).json();

    const expectedResponse = {
        success: false,
        message: "Request failed due to error"
    };

    expect({
        success: quoteResponse.success,
        message: quoteResponse.message
    }).toEqual(expectedResponse);
});

test('invalid parameter type quote generation test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser4',
        password: 'unsecurePassword4'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: GenerateQuoteRequest = {
        username: 'dummyUser4',
        accessToken: loginRes.response.accessToken,
        gallonsRequested: "5" as unknown as number,
        deliveryDate: "2023-10-20",
        loc: "Houston"
    }

    const quoteResponse = await (await generateQuoteData(testRequest as GenerateQuoteRequest)).json();

    const expectedResponse = {
        success: false,
        message: "Request failed due to error"
    };

    expect({
        success: quoteResponse.success,
        message: quoteResponse.message
    }).toEqual(expectedResponse);
});

test('unsuccesful quote generation due to invalid access token', async () => {
    const testRequest: GenerateQuoteRequest = {
        username: 'dummyUser4',
        accessToken: '',
        gallonsRequested: 5,
        deliveryDate: "2023-10-21",
        loc: "Houston"
    }

    expect(await (await generateQuoteData(testRequest)).json()).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
});