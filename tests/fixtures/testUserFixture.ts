import { test as base } from '@playwright/test';
import { generateRandomEmail } from '../utils/userUtils';

export type TestUser = {
  email: string;
  password: string;
};

export const test = base.extend<{
  testUser: TestUser;
}>({
  testUser: async ({}, use) => {
    const user = {
      email: generateRandomEmail(),
      password: 'Password123!'
    };
    await use(user);
  }
});