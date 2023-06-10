import { test as baseTest, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

export const test = baseTest.extend<{searchPage: SearchPage}>({
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    }
});

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('/');
  });

export { expect } from '@playwright/test';