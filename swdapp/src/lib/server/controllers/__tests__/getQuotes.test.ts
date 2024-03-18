import { beforeAll, expect, test, vi } from 'vitest';

import { getProfileData, getQuoteHistoryData } from '../profileController';
import type { QuoteHistoryRequest, QuoteHistoryResponse, GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
})

test('successful quote history test', async () => {
    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUser3',
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

test('successful quote history test (empty / no quotes)', async () => {
    const testRequest: QuoteHistoryRequest = {
        username: 'dummyUser2',
    }

    expect(await (await getQuoteHistoryData(testRequest)).json()).toEqual({
            success: true,
            quoteHistory: [] 
    } as QuoteHistoryResponse);
})

test('profile not found test', async () => {
    const testRequest: QuoteHistoryRequest = {
        username: 'dddummyUser3',
    }

    expect(await (await getQuoteHistoryData(testRequest)).json()).toEqual({
        success: false,
        message: "Quote history not found"
    } as GeneralAPIResponse);
})