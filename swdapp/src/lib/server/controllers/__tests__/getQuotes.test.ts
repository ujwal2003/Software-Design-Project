import { beforeAll, expect, test, vi } from 'vitest';

import { getQuoteHistoryData } from '../profileController';
import type { QuoteHistoryRequest, QuoteHistoryResponse, GeneralAPIResponse, UnauthorizedResponse } from '$lib/server/customTypes/generalTypes';
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

test.skip('successful quote history test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getQuoteHistoryData(testRequest)).json()).toEqual({
        success: true,
        quoteHistory: [
            {
                _id: "9e8e9a6bcc756b25eb1bef22",
                generationDate: "2024-02-25T00:00:00.000Z", // Adjusted to match the format of actual data
                gallonsRequested: 5,
                priceCalculated: 2.65
            },
            {
                _id: "a53b59be0a4182fb778de339",
                generationDate: "2024-01-20T00:00:00.000Z", // Adjusted to match the format of actual data
                gallonsRequested: 3,
                priceCalculated: 3.65
            },
            {
                _id: "8272a0022599956bcb1659ee",
                generationDate: "2023-01-15T00:00:00.000Z", // Adjusted to match the format of actual data
                gallonsRequested: 5,
                priceCalculated: 1.65
            }
        ] 
    });
    

})

test.skip('successful quote history test (empty / no quotes)', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser2',
        password: 'unsecurePassword2'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUser2',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getQuoteHistoryData(testRequest)).json()).toEqual({
            success: true,
            quoteHistory: [] 
    } as QuoteHistoryResponse);
})

test.skip('profile not found test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUser1',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getQuoteHistoryData(testRequest)).json()).toEqual({
        success: false,
        message: "Quote history not found"
    } as GeneralAPIResponse);
})

test.skip('user not found test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUserNew',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getQuoteHistoryData(testRequest)).json()).toEqual({
        success: false,
        message: "Quote history not found"
    } as GeneralAPIResponse);
})

test.skip('unsuccesful quote retrieval due to invalid access token', async () => {
    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUser3',
        accessToken: ''
    }

    expect(await (await getQuoteHistoryData(testRequest)).json()).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
})

test.skip('unsuccesful quote retrieval due to internal error', async () => {
    //@ts-expect-error
    expect(await (await getQuoteHistoryData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
})