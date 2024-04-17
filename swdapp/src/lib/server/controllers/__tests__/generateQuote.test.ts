import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import * as bcrypt from "bcrypt";
import { generateQuoteData } from '../profileController';
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import * as QuoteService from "../../services/quoteService";
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';
import type { GeneralAPIResponse, UnauthorizedResponse } from '$lib/server/customTypes/generalTypes';
import type { GenerateQuoteResponse } from "$lib/server/customTypes/quoteTypes";
import type { GenerateQuoteRequest } from "$lib/server/customTypes/quoteTypes";

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');
const getQuoteSpy = vi.spyOn(QuoteService, 'generateQuote');

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
    getQuoteSpy.mockRestore();
});

test('successful quote generation', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: GenerateQuoteRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        gallonsRequested: 5,
        deliveryDate: "2024-11-21",
        loc: "Houston"
    };

    getQuoteSpy.mockImplementation(async () => {
        return {
            generationDate: new Date(),
            gallonsRequested: testRequest.gallonsRequested,
            priceCalculated: Math.random()
        }
    });

    const res = await generateQuoteData(testRequest);
    const resJSON: GenerateQuoteResponse = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.gallonsRequested).toEqual(testRequest.gallonsRequested);
    expect(resJSON.priceCalculated).toBeDefined();
});

test('unsuccessful quote generation', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: GenerateQuoteRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        gallonsRequested: 5,
        deliveryDate: "2024-11-21",
        loc: "Houston"
    };

    getQuoteSpy.mockImplementation(async () => { return null });

    const res = await generateQuoteData(testRequest);
    const resJSON: GeneralAPIResponse = await res.json();

    expect(resJSON.success).toBeFalsy();
    expect(resJSON.message).toEqual("Quote could not be generated");
});

test('invalid parameter type quote generation', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: GenerateQuoteRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        gallonsRequested: "5" as unknown as number,
        deliveryDate: "2024-11-21",
        loc: "Houston"
    };

    getQuoteSpy.mockImplementation(async () => {
        return {
            generationDate: new Date(),
            gallonsRequested: testRequest.gallonsRequested,
            priceCalculated: Math.random()
        }
    });

    const res = await generateQuoteData(testRequest);
    const resJSON: GeneralAPIResponse = await res.json();

    expect(resJSON.success).toBeFalsy();
    expect(resJSON.message).toEqual("Request failed due to error");
});

test('unsuccesful quote generation due to invalid access token', async () => {
    const testRequest: GenerateQuoteRequest = {
        username: 'dummyUser',
        accessToken: '',
        gallonsRequested: 5,
        deliveryDate: "2024-11-21",
        loc: "Houston"
    };

    const res = await generateQuoteData(testRequest);
    const resJSON: UnauthorizedResponse = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.unauthorized).toBeTruthy();
    expect(resJSON.message).toEqual('invalid access token');
});

test('failure due to internal server error', async () => {
    //@ts-expect-error
    expect(await (await generateQuoteData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
});