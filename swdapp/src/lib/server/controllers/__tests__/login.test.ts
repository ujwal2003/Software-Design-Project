import { expect, test } from 'vitest';

import type { LoginRequest } from '$lib/server/customTypes/authTypes';

test.todo('succesful login for user', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'unsecurePassword1'
    }
})

test.todo('unsuccesful login (user does not exist)', async () => {
    const testRequest: LoginRequest = {
        username: 'nonExistentUser',
        password: 'nonExistentPassword'
    }
})

test.todo('unsucessful login (wrong password)', async () => {
    const testRequest: LoginRequest = {
        username: 'dummyUser1',
        password: 'wrongPassword'
    }
})

test.todo('authentication fails due to error or invalid info', async () => {

})