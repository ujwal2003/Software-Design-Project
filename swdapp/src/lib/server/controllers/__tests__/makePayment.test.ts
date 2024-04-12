import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import * as PaymentService from "../../services/paymentService";
import { makePaymentMethod } from '../profileController';
import type { GeneralAPIResponse, MakePaymentRequest, UnauthorizedResponse } from '$lib/server/customTypes/generalTypes';
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');
const paySpy = vi.spyOn(PaymentService, 'makePayment');

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
    paySpy.mockRestore();
});

test('successful payment', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: MakePaymentRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        company: 'dummy',
        price: 30,
        quoteID: crypto.randomBytes(24 / 2).toString('hex')
    };

    (paySpy as any).mockImplementation(async () => { return true });

    const res = await makePaymentMethod(testRequest);
    const resJSON: GeneralAPIResponse = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.message).toEqual("Payment successful");
});

test('unsuccesful payment due to invalid access token', async () => {
    const testRequest: MakePaymentRequest = {
        username: 'dummyUser',
        accessToken: '',
        company: 'dummy',
        price: 30,
        quoteID: crypto.randomBytes(24 / 2).toString('hex')
    };

    const res = await makePaymentMethod(testRequest);
    const resJSON: UnauthorizedResponse = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.unauthorized).toBeTruthy();
    expect(resJSON.message).toEqual("invalid access token");
});

test('unsuccesful payment due to no payment info set', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: MakePaymentRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        company: 'dummy',
        price: 30,
        quoteID: crypto.randomBytes(24 / 2).toString('hex')
    };

    paySpy.mockImplementation(async () => { return undefined });

    const res = await makePaymentMethod(testRequest);
    const resJSON: GeneralAPIResponse = await res.json();

    expect(resJSON.success).toBeFalsy();
    expect(resJSON.message).toEqual("Payment failed");
});

test('unsuccesful payment due to internal error', async () => {
    //@ts-expect-error
    expect(await (await makePaymentMethod()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
});