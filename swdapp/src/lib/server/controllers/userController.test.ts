import { expect, test } from 'vitest'
import { userExists } from './userController'

test('check if a user exists', async () => {
    expect(await userExists('dummy')).toBe(false)
})