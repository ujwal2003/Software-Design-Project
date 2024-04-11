import { beforeAll, expect, test, vi } from 'vitest';
import { parseEnv } from './util/envMock';
import { connect } from '../../database/mongo';

import type { LoginFailure, LoginRequest, LoginResponse, LoginSuccess } from '$lib/server/customTypes/authTypes';
import { logOutUser, loginUser } from '../authController';

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
});

test.skip('succesful login for user', async () => {
    const testRequest: LoginRequest = {
        username: 'user1',
        password: 'pass1'
    }

    console.log('test???????');
    const apiRes = await loginUser(testRequest);
    console.log(apiRes);
    // const res: LoginResponse<LoginSuccess> = await (await loginUser(testRequest)).json();
    const res: LoginResponse<LoginSuccess> = await apiRes.json();
    // console.log(res);

    expect(res.success).toBe(true);
    expect(Object.keys(res.response).length).toEqual(2);
    expect(res.response.accessToken).toBeTypeOf('string');
    expect(res.response.accessToken.length).toBeGreaterThan(0);
    expect(res.response.refreshToken).toBeTypeOf('string');
    expect(res.response.refreshToken.length).toBeGreaterThan(0);

    const logOut = await (await logOutUser({
        username: testRequest.username,
        refreshToken: res.response.refreshToken
    })).json();

    expect(logOut.success).toBeTruthy();
})

test.skip('unsuccesful login (user does not exist)', async () => {
    const testRequest: LoginRequest = {
        username: 'nonExistentUser',
        password: 'nonExistentPassword'
    }

    expect(await (await loginUser(testRequest)).json()).toEqual({
        success: false,
        response: {
            failType: 'invalid_user',
            message: 'User not found'
        }
    } as LoginResponse<LoginFailure>);
})

test.skip('unsucessful login (wrong password)', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'wrongPassword'
    }

    expect(await (await loginUser(testRequest)).json()).toEqual({
        success: false,
        response: {
            failType: 'invalid_pass',
            message: `invalid password for user ${testRequest.username}`
        }
    } as LoginResponse<LoginFailure>);
})

test.skip('authentication fails due to error or invalid info', async () => {
    // @ts-expect-error
    expect(await (await loginUser()).json()).toEqual({
        success: false,
        response: {
            failType: 'error',
            message: 'login failed due to internal server error'
        }
    } as LoginResponse<LoginFailure>);
})