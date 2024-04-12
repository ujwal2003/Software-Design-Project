import { afterAll, beforeAll, expect, test, vi } from "vitest";
import { logOutUser } from "../authController";

import * as AuthService from '../../services/authorizationService';
import type { LogOutRequest, LogOutResponse } from "$lib/server/customTypes/authTypes";

const revokeRefTokenSpy = vi.spyOn(AuthService, 'revokeRefreshToken');

beforeAll(() => {
    vi.mock('$env/static/private', () => {
        return {
            REFRESH_TOKEN_SECRET: 'test',
            ACCESS_TOKEN_SECRET: 'test2',
        };
    });
});

afterAll(() => {
    revokeRefTokenSpy.mockRestore();
});

test('successfull user logout', async () => {
    const testRequest: LogOutRequest = {
        username: 'dummyUser',
        refreshToken: ''
    };

    revokeRefTokenSpy.mockImplementation(async () => { return; });

    const res = await logOutUser(testRequest);
    const resJSON = await res.json();

    expect(resJSON).toEqual({
        success: true,
        message: `Successfully logged out user ${testRequest.username}`
    } as LogOutResponse);
});