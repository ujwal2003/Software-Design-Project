import { beforeAll, expect, test, vi } from 'vitest';

import { getReceipts } from '../profileController';
import type { QuoteHistoryRequest, GeneralAPIResponse, UnauthorizedResponse, PurchaseHistoryRequest, PurchaseHistoryResponse } from '$lib/server/customTypes/generalTypes';
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

test.skip('successful purchase history test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser4',
        password: 'unsecurePassword4'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: PurchaseHistoryRequest = {
        username: 'dummyUser4',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getReceipts(testRequest)).json()).toEqual({
        success: true,
        purchaseHistory: [
            {
                _id: "4319cc4aaff141ff0d93ffb2",
                quoteID: "311650601c91eb0501b75a98",
                purchaseDate: "2024-03-10T00:00:00.000Z",
                deliveryDate: "2024-03-11T00:00:00.000Z",
                tax: 2.10,
                price: 25.23
            },
            {
                _id: "aeae92d4b6478cb65d2fc6c8",
                quoteID: "b991d60266e4a73503571c61",
                purchaseDate: "2024-03-18T00:00:00.000Z",
                deliveryDate: "2024-03-19T00:00:00.000Z",
                tax: 4.52,
                price: 10.24
            },
            {
                _id: "777287681d68d56ebac8e635",
                quoteID: "2593b58ba4dc28e2b4e1edbd",
                purchaseDate: "2024-03-22T00:00:00.000Z",
                deliveryDate: "2024-03-24T00:00:00.000Z",
                tax: 5.72,
                price: 300.21
            }
        ] 
    });
})

test.skip('successful purchase history test (empty / no quotes)', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: PurchaseHistoryRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getReceipts(testRequest)).json()).toEqual({
            success: true,
            purchaseHistory: [] 
    } as PurchaseHistoryResponse);
})

test.skip('purchase history not found test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: PurchaseHistoryRequest = {
        username: 'dummyUser1',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getReceipts(testRequest)).json()).toEqual({
        success: false,
        message: "Purchase history not found"
    } as GeneralAPIResponse);
})

test.skip('purchase history not found test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: PurchaseHistoryRequest = {
        username: 'dummyUserNew',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getReceipts(testRequest)).json()).toEqual({
        success: false,
        message: "Purchase history not found"
    } as GeneralAPIResponse);
})

test.skip('unsuccesful quote retrieval due to invalid access token', async () => {
    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUser3',
        accessToken: ''
    }

    expect(await (await getReceipts(testRequest)).json()).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
})

test.skip('unsuccesful quote retrieval due to internal error', async () => {
    //@ts-expect-error
    expect(await (await getReceipts()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
})