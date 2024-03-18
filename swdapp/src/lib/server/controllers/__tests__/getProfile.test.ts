import { beforeAll, expect, test, vi } from 'vitest';

import { getProfileData } from '../profileController';
import type { ProfileRequest, ProfileResponse, GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';
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

test('successful profile info test', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser3',
        password: 'unsecurePassword3'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    
    const testRequest: ProfileRequest = {
        username: 'dummyUser3',
        accessToken: loginRes.response.accessToken
    }

    expect(await (await getProfileData(testRequest)).json()).toEqual({
            success: true,
            _id: "cf7226e79ea6c264b5675b12",
            firstName: "fname2",
            middleName: "mName2",
            lastName: "lName2",
            location: "loc2"
    } as ProfileResponse);
})

test('profile not found test', async () => {
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