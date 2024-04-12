import { afterAll, expect, test, vi } from "vitest";
import { registerUser } from "../registerController";

import * as UserService from '../../services/userService';
import type { RegistrationRequest, RegistrationResponse } from "$lib/server/customTypes/authTypes";

const userExistsSpy = vi.spyOn(UserService, 'userExists');
const addUserSpy = vi.spyOn(UserService, 'addUser');

afterAll(() => {
    userExistsSpy.mockRestore();
    addUserSpy.mockRestore();
});

test('unsuccesful registration because the user already exists', async () => {
    const testRequest: RegistrationRequest = {
        username: 'registeredUser',
        password: 'pass1'
    };

    (userExistsSpy as any).mockImplementation(async () => { return true; });

    const res = await registerUser(testRequest);
    const resJSON: RegistrationResponse = await res.json();

    expect(resJSON).toEqual({
        success: false,
        response: {
            failType: 'exists',
            message: `${testRequest.username} is already registered`
        }
    } as RegistrationResponse);
});

test('succesful registration of a new user', async () => {
    const newRandomUserName = Math.random().toString(36).substring(2,7) + '_' + Date.now().toString();
    console.log(`Testing new registration for test user: ${newRandomUserName}`);

    const testRequest: RegistrationRequest = {
        username: newRandomUserName,
        password: 'newPassword'
    };

    userExistsSpy.mockImplementation(async () => { return false; });
    (addUserSpy as any).mockImplementation( async () => { return true; });

    const res = await registerUser(testRequest);
    const resJSON: RegistrationResponse = await res.json();

    expect(resJSON).toEqual({
        success: true,
        response: `Succesfully registered ${newRandomUserName}`
    } as RegistrationResponse);
});

test('registration fails due to network error or undefined info', async () => {
    //@ts-expect-error
    expect(await (await registerUser()).json()).toEqual({
        success: false,
        response: {
            failType: 'error',
            message: "Request failed due to error"
        }
    } as RegistrationResponse);
});