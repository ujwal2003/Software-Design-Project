import { afterAll, beforeAll, expect, test, vi } from 'vitest';

import * as bcrypt from "bcrypt";
import { getProfileData } from '../profileController';
import * as UserService from '../../services/userService';
import * as AuthService from "../../services/authorizationService";
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { loginUser } from '../authController';
import type { GeneralAPIResponse, ProfileRequest, UnauthorizedResponse } from '$lib/server/customTypes/generalTypes';

const getProfileSpy = vi.spyOn(UserService, 'getProfile');
const userExistsSpy = vi.spyOn(UserService, 'userExists');
const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');
const addRefTokenSpy = vi.spyOn(AuthService, 'addUserRefreshSession');

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2'
        }
    });
})

afterAll(() => {
    getProfileSpy.mockRestore();
    userExistsSpy.mockRestore();
    getCredsSpy.mockRestore();
    addRefTokenSpy.mockRestore();
});

test('successful profile info', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: ProfileRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken
    };

    (getProfileSpy as any).mockImplementation(async () => {
        return {
            firstName: 'fname',
            middleName: 'mName',
            lastName: 'lName',
            street: 'street st',
            city: 'city',
            state: 'state',
            zip: '12345',
            paymentInfo: {
                cardName: 'Dummy Card',
                creditCardNumber: '928374927349283984729',
                cardExpiration: new Date('2027-04-26'),
                cardCVV: '123'
            }
        }
    });

    const res = await getProfileData(testRequest);
    const resJSON = await res.json();

    expect(resJSON.success).toBeTruthy();
    expect(resJSON.profile).toBeDefined();
    expect(resJSON.profile).toEqual({
        firstName: 'fname',
        middleName: 'mName',
        lastName: 'lName',
        city: 'city',
        state: 'state',
        street: 'street st',
        zip: '12345'
    });
    expect(resJSON.paymentInfo).toBeDefined();
});

test('profile not found', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: ProfileRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken
    };

    getProfileSpy.mockImplementation(async () => { return null; });

    const res = await getProfileData(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: false,
        message: 'Profile not found'
    } as GeneralAPIResponse);
});

test('user not found', async () => {
    const testLoginRequest: LoginRequest = { username: 'dummyUser', password: 'pass1' };

    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(testLoginRequest.password, salt);

    (userExistsSpy as any).mockImplementation(async () => { return true; });
    getCredsSpy.mockImplementation(async () => { return { username: 'user1', encryptedPass: hashedPass }; });
    addRefTokenSpy.mockImplementation(async () => { return; });

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    expect(loginRes.success).toBeTruthy();

    const testRequest: ProfileRequest = {
        username: testLoginRequest.username,
        accessToken: loginRes.response.accessToken
    };

    getProfileSpy.mockImplementation(async () => { return null; });

    const res = await getProfileData(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: false,
        message: 'Profile not found'
    } as GeneralAPIResponse);
});

test('profile not found due to invalid access token', async () => {
    const testRequest: ProfileRequest = {
        username: 'dummyUser',
        accessToken: ''
    };

    getProfileSpy.mockImplementation(async () => { return null; });

    const res = await getProfileData(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
});

test('profile retrieval dailed due to internal error', async () => {
    //@ts-expect-error
    expect(await (await getProfileData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
});