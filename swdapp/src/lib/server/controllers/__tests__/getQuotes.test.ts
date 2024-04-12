import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import * as bcrypt from "bcrypt";
import { getQuoteHistoryData } from '../profileController';
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import * as QuoteService from "../../services/quoteService";
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';
import type { GeneralAPIResponse, QuoteHistoryRequest } from '$lib/server/customTypes/generalTypes';

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');
const quoteHistorySpy = vi.spyOn(QuoteService, 'getQuoteHistory');

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
});

afterAll(() => {
    userExistsSpy.mockRestore();
    getCredsSpy.mockRestore();
    addRefTokenSpy.mockRestore();
    quoteHistorySpy.mockRestore();
});

test('successful quote history', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: QuoteHistoryRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken
    };

    (quoteHistorySpy as any).mockImplementation(async () => {
        return [
            { generationDate: new Date("2024-04-11"), gallonsRequested: 5, priceCalculated: 2.65 },
            { generationDate: new Date("2024-04-10"), gallonsRequested: 3, priceCalculated: 3.45 },
            { generationDate: new Date("2024-04-09"), gallonsRequested: 7, priceCalculated: 1.75 }
        ];
    });

    const res = await getQuoteHistoryData(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.quoteHistory).toBeDefined();
    expect(resJSON.quoteHistory.length).toEqual(3);
    expect(resJSON.quoteHistory[0]).toBeTypeOf('object');
});

test.todo('succesful quote history for user with now quotes', async () => {
    //TODO implementation
});

test.todo('failure to get quotes because user does not have a profile set', async () => {
    //TODO implementation
});

test.todo('unsuccesful quote retrieval due to invalid access token', async () => {
    //TODO implementation
});

test.todo('unsuccesful quote retrieval due to internal error', async () => {
    //TODO implementation
});

test('unsuccesful quote retrieval due to internal error', async () => {
    //@ts-expect-error
    expect(await (await getQuoteHistoryData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
});