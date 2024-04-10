import { beforeAll, expect, test, vi } from 'vitest';
import { parseEnv } from './util/envMock';

import type { LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { accessTokenStatus, logOutUser, loginUser } from '../authController';
import type { GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';
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

test('Access token is still valid', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testTokenStatusRequest = {
        accessToken: loginRes.response.accessToken,
        refreshToken: loginRes.response.refreshToken
    }

    const res = await (await accessTokenStatus(testTokenStatusRequest)).json();

    expect(res.success).toBe(true);
    expect(res.valid).toBe(true);
    expect(res.message).toEqual('token is still valid');
    expect(res.payload).toBeDefined();

    const logOut = await (await logOutUser({
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken
    })).json();

    expect(logOut.success).toBeTruthy();
})

test('Access token is invalid', async () => {
    const testLoginRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }

    const loginRes: LoginResponse<LoginSuccess> = await (await loginUser(testLoginRequest)).json();
    const testTokenStatusRequest = {
        accessToken: loginRes.response.accessToken,
        refreshToken: loginRes.response.refreshToken + 'abcd'
    }

    const res = await (await accessTokenStatus(testTokenStatusRequest)).json();

    expect(res.success).toBeTruthy();
    expect(res.valid).toBeFalsy();
    expect(res.message).toEqual('token has expired');

    const logOut = await (await logOutUser({
        username: testLoginRequest.username,
        refreshToken: loginRes.response.refreshToken
    })).json();

    expect(logOut.success).toBeTruthy();
})

test('Token verification failure', async () => {
    //@ts-expect-error
    expect(await (await accessTokenStatus()).json()).toEqual({
        success: false,
        message: "failed to verify token due to internal server error"
    } as GeneralAPIResponse);
})