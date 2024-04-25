import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import * as bcrypt from "bcrypt";
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import * as QuoteService from "../../services/quoteService";
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';
import { saveQuoteData } from '../quoteController';
import type { SaveQuoteRequest } from '$lib/server/customTypes/quoteTypes';
import type { GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');
const saveQuoteSpy = vi.spyOn(QuoteService, 'saveQuote');

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
    saveQuoteSpy.mockRestore();
});

test('cannot save quote due to invalid access token', async () => {
    const testRequest: SaveQuoteRequest = {
        username: 'dummyUser',
        accessToken: '',
        deliveryDate: new Date(),
        gallonsRequested: 314,
        generationDate: new Date(),
        location: 'loc',
        priceCalculated: 3.14
    };

    const res = await saveQuoteData(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.unauthorized).toBeTruthy();
    expect(resJSON.message).toEqual('invalid access token');
});

test('succesfully saved quote', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: SaveQuoteRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        deliveryDate: new Date(),
        gallonsRequested: 314,
        generationDate: new Date(),
        location: 'loc',
        priceCalculated: 3.14
    };

    saveQuoteSpy.mockImplementation(async () => { return true });

    const res = await saveQuoteData(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.message).toEqual('succesfully saved quote');
});

test('failed to save quote due to database error', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: SaveQuoteRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        deliveryDate: new Date(),
        gallonsRequested: 314,
        generationDate: new Date(),
        location: 'loc',
        priceCalculated: 3.14
    };

    saveQuoteSpy.mockImplementation(async () => { return false });

    const res = await saveQuoteData(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeFalsy();
    expect(resJSON.message).toEqual('failed to save quote due to internal error');
});

test('failed to save quote due to internal error', async () => {
    //@ts-expect-error
    expect(await (await saveQuoteData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
});