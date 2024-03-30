import { expect, test } from 'vitest';

import { registerUser } from '../registerController';
import type { RegistrationRequest, RegistrationResponse } from '$lib/server/customTypes/authTypes';

test('unsuccesful registration where a user already exists', async () => {
    const testRequest: RegistrationRequest = {
        username: 'dummyUser1',
        password: 'pass1'
    }

    expect(await (await registerUser(testRequest)).json()).toEqual({
        success: false,
        response: {
            failType: 'exists',
            message: 'dummyUser1 is already registered'
        }
    } as RegistrationResponse);
})

test('succesful registration of a new user', async () => {
    const newRandomUserName = Math.random().toString(36).substring(2,7) + '_' + Date.now().toString();
    console.log(`Testing new registration for test user: ${newRandomUserName}`);

    const testRequest: RegistrationRequest = {
        username: newRandomUserName,
        password: 'unsecurePassword'
    }

    expect(await (await registerUser(testRequest)).json()).toEqual({
        success: true,
        response: `Succesfully registered ${newRandomUserName}`
    } as RegistrationResponse);
})

test('registration fails due to network error or undefined info', async () => {
    // @ts-expect-error
    expect(await (await registerUser()).json()).toEqual({
        success: false,
        response: {
            failType: 'error',
            message: "Request failed due to error"
        }
    } as RegistrationResponse);
})