import { beforeAll, expect, test, vi } from 'vitest';

import { getProfileData } from '../profileController';
import type { ProfileRequest, ProfileResponse, GeneralAPIResponse, UnauthorizedResponse } from '$lib/server/customTypes/generalTypes';
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

test.skip('successful profile info test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    
    const testRequest: ProfileRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken
    }

    const profileDataRes = await (await getProfileData(testRequest)).json();

    expect(profileDataRes.success).toBeTruthy();
    expect(profileDataRes.profile).toBeDefined();
    expect(profileDataRes.profile).toEqual({
        firstName: "fname2",
        middleName: "mName2",
        lastName: "lName2",
        city: "Dallas",
        state: "TX",
        street: "423263 coolStreetName Dr",
        zip: "98765"
    });
    expect(profileDataRes.paymentInfo).toBeDefined();

    // expect(await (await getProfileData(testRequest)).json()).toEqual({
    //         success: true,
    //         profile: {
    //             firstName: "fname2",
    //             middleName: "mName2",
    //             lastName: "lName2",
    //             city: "Dallas",
    //             state: "TX",
    //             street: "423263 coolStreetName Dr",
    //             zip: "98765"
    //         },
    //         paymentInfo: {
                
    //         }
    // } as ProfileResponse);
})

test.skip('profile not found test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: ProfileRequest = {
        username: 'dummyUser1',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getProfileData(testRequest)).json()).toEqual({
        success: false,
        message: "Profile not found"
    } as GeneralAPIResponse);
})

test.skip('user not found test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();

    const testRequest: ProfileRequest = {
        username: 'dummyUserNew',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getProfileData(testRequest)).json()).toEqual({
        success: false,
        message: "Profile not found"
    } as GeneralAPIResponse);
})

test.skip('profile not found due to invalid access token', async () => {
    const testRequest: ProfileRequest = {
        username: "dummyUser3",
        accessToken: ''
    }

    expect(await (await getProfileData(testRequest)).json()).toEqual({
        success: true,
        unauthorized: true,
        message: 'invalid access token'
    } as UnauthorizedResponse);
})

test.skip('profile retrieval dailed due to internal error', async () => {
    //@ts-expect-error
    expect(await (await getProfileData()).json()).toEqual({
        success: false,
        message: "Request failed due to error"
    } as GeneralAPIResponse);
})