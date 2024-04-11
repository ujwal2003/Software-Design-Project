import type { LoginFailure, LoginRequest, LoginResponse } from "$lib/server/customTypes/authTypes";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";

import * as UserService from '../../services/userService';
import * as AuthService from '../../services/authorizationService';
import { loginUser } from "../authController";

describe('logging in', async () => {
    const userExistsSpy = vi.spyOn(UserService, 'userExists');
    const getCredsSpy = vi.spyOn(AuthService, 'getUserCredentials');

    beforeAll(() => {
        vi.mock('$env/static/private', () => {
            return {
                REFRESH_TOKEN_SECRET: 'test',
                ACCESS_TOKEN_SECRET: 'test2',
            };
        });
    });

    afterAll(() => {
        userExistsSpy.mockRestore();
        getCredsSpy.mockRestore();
    });

    test('succesful user login', async () => {
        const testRequest: LoginRequest = {
            username: 'user1',
            password: 'pass1'
        };

        (userExistsSpy as any).mockImplementation(async () => {
            return true;
        });

        getCredsSpy.mockImplementation(async () => {
            return {
                username: 'user1',
                encryptedPass: ''
            };
        });

        const res = await loginUser(testRequest);
        const resJSON: LoginResponse<LoginFailure> = await res.json();
        
        expect(resJSON.success).toBeFalsy();
    });

});