import { afterAll, beforeAll, expect, test, vi } from 'vitest';
import * as bcrypt from "bcrypt";
import { updateAccountData } from '../profileController';
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import * as PaymentService from "../../services/paymentService";
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';
import type { GeneralAPIResponse, UnauthorizedResponse, UpdateAccountRequest } from '$lib/server/customTypes/generalTypes';

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');
const updateAcctSpy = vi.spyOn(UserService, 'updateAccount');
const updatePaySpy = vi.spyOn(PaymentService, 'updatePayment');

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
})

afterAll(() => {
    userExistsSpy.mockRestore();
    getCredsSpy.mockRestore();
    addRefTokenSpy.mockRestore();
    updateAcctSpy.mockRestore();
    updatePaySpy.mockRestore();
});

test('successful account update test', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: UpdateAccountRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        profileUpdates: {
            firstName: 'coolName',
            lastName: 'amazingLastName'
        }
    };

    (updateAcctSpy as any).mockImplementation(async () => { return true; });

    const res = await updateAccountData(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: true,
        message: "Account update successful"
    } as GeneralAPIResponse);
});

test('succesful payment information update', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: UpdateAccountRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken,
        paymentUpdates: {
            cardName: "dummy user's card",
            cvv: '123'
        }
    };

    updatePaySpy.mockImplementation(async () => { return true; });

    const res = await updateAccountData(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: true,
        message: "Account update successful"
    } as GeneralAPIResponse);
});

test('failure to update account due to invalid access token', async () => {
    const testRequest: UpdateAccountRequest = {
        username: 'dummyUser1',
        accessToken: '',
        profileUpdates: {
            firstName: "John",
            lastName: "Doe"
        }
    };

    const res = await updateAccountData(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
});

test('failure to update account due to internal error', async () => {
    //@ts-expect-error
    expect(await (await updateAccountData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
});