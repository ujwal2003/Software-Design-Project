import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import * as PaymentService from "../../services/paymentService";
import { getReceipts } from '../profileController';
import type { GeneralAPIResponse, UnauthorizedResponse, PurchaseHistoryRequest, PurchaseHistoryResponse } from '$lib/server/customTypes/generalTypes';
import type { QuoteHistoryRequest } from "$lib/server/customTypes/quoteTypes";
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');
const receiptsSpy = vi.spyOn(PaymentService, 'getPurchaseHistory');

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
    receiptsSpy.mockRestore();
});

test('successful purchase history retrieval', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: PurchaseHistoryRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken
    };

    (receiptsSpy as any).mockImplementation(async () => {
        return [
            { quoteID: crypto.randomBytes(24 / 2).toString('hex'), purchaseDate: "2024-03-10T00:00:00.000Z", deliveryDate: "2024-03-11T00:00:00.000Z", tax: 2.10, price: 25.23 },
            { quoteID: crypto.randomBytes(24 / 2).toString('hex'), purchaseDate: "2024-03-18T00:00:00.000Z", deliveryDate: "2024-03-19T00:00:00.000Z", tax: 2.10, price: 25.23 },
            { quoteID: crypto.randomBytes(24 / 2).toString('hex'), purchaseDate: "2024-03-22T00:00:00.000Z", deliveryDate: "2024-03-24T00:00:00.000Z", tax: 2.10, price: 25.23 }
        ];
    });

    const res = await getReceipts(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.purchaseHistory).toBeDefined();
    expect(resJSON.purchaseHistory.length).toEqual(3);
});

test('successful purchase history retrieval with no receipts', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: PurchaseHistoryRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken
    };

    (receiptsSpy as any).mockImplementation(async () => { return [] });

    const res = await getReceipts(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.purchaseHistory.length).toEqual(0);
});

test('failure due to invalid access token', async () => {
    const testRequest: PurchaseHistoryRequest = {
        username: 'dummyUser',
        accessToken: ''
    };

    const res = await getReceipts(testRequest);
    const resJSON: UnauthorizedResponse = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.unauthorized).toBeTruthy();
    expect(resJSON.message).toEqual('invalid access token');
});

test('failure due to profile not found', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: PurchaseHistoryRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken
    };

    receiptsSpy.mockImplementation(async () => { return null });

    const res = await getReceipts(testRequest);
    const resJSON: GeneralAPIResponse = await res.json();

    expect(resJSON.success).toBeFalsy();
    expect(resJSON.message).toEqual("Purchase history not found");
});

test('unsuccesful retrieval due to internal error', async () => {
    //@ts-expect-error
    expect(await (await getReceipts()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
});