import { expect, test } from 'vitest';

import { getProfileData } from '../profileController';
import type { ProfileRequest, ProfileResponse, GeneralAPIResponse } from '$lib/server/customTypes/generalTypes';

test('successful profile info test', async () => {
    const testRequest: ProfileRequest = {
        username: 'dummyUser3',
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
    const testRequest: ProfileRequest = {
        username: 'dddummyUser3',
    }

    expect(await (await getProfileData(testRequest)).json()).toEqual({
        success: false,
        message: "Profile not found"
    } as GeneralAPIResponse);
})