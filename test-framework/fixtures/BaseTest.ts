import { test as baseTest, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { GitHubPage } from '../pages/GitHubPage';

export const test = baseTest.extend<{
    searchPage: SearchPage;
    githubPage: GitHubPage;
    foo: string;
}>({
    searchPage: async ({ page }, use) => {
        const searchPage = new SearchPage(page);
        await use(searchPage);
    },
    githubPage: async ({ page }, use) => {
        const githubPage = new GitHubPage(page);
        await use(githubPage);
    }
});

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('/');
  });

export { expect } from '@playwright/test';