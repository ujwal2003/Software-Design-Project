import { beforeAll, expect, test, vi } from 'vitest';
import { parseEnv } from './util/envMock';

import { reauthorizeUser, loginUser, logOutUser } from '../authController';
import type { GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';
import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { connect } from '../../database/mongo';

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        const envVars = parseEnv('../swdapp/.env');

        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2',
            MONGO_CLUSTER: envVars.MONGO_CLUSTER,
            DB_NAME: envVars.DB_NAME,
            CLUSTER_USER: envVars.CLUSTER_USER,
            CLUSTER_PASS: envVars.CLUSTER_PASS
        }
    });

    connect().then(() => { console.log("[TESTING_ENV]: connected to MongoDB") });
})

test.skip('failure to reauthorize due to no token provided', async () => {
    const testReauthorizeResponse = {
        username: 'dummyUser1',
        refreshToken: ''
    };

    expect(await (await reauthorizeUser(testReauthorizeResponse)).json()).toEqual({
        success: false,
        message: 'no token provided'
    } as GeneralAPIResponse);
})

test.skip('failure to reauthorize due refresh token being invalid', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testReauthorizeResponse = {
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken + 'abcd'
    }

    const res = await (await reauthorizeUser(testReauthorizeResponse)).json();
    const logOut = await (await logOutUser({
        username: testReauthorizeResponse.username,
        refreshToken: loginRes.response.refreshToken
    })).json();

    expect(res).toEqual({
        success: false,
        message: 'invalid token provided'
    } as GeneralAPIResponse);

    expect(logOut.success).toBeTruthy();
})

test.skip('succesful user reauthorization', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testReauthorizeResponse = {
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken
    }

    console.log(loginRes);
    console.log(testReauthorizeResponse)

    const res = await (await reauthorizeUser(testReauthorizeResponse)).json();
    
    console.log(res);
    
    expect(res.success).toBeTruthy();
    expect(res.payload).toBeDefined();
    expect(res.newAccessToken).toBeTypeOf("string");

    const logOut = await (await logOutUser({
        username: testReauthorizeResponse.username,
        refreshToken: loginRes.response.refreshToken
    })).json();

    expect(logOut.success).toBeTruthy();
})

test.skip('failure to reauthorize due to internal error', async () => {
    //@ts-expect-error
    expect(await (await reauthorizeUser()).json()).toEqual({
        success: false,
        message: "failed to authorize due to internal server error"
    } as GeneralAPIResponse);
})