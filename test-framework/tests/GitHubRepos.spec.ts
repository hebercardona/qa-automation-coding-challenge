import { test, expect } from "../fixtures/BaseTest";
import { Repository } from "../framework/ItemTypes";

test('Verify search feedback message when using an invalid username', async ({ searchPage }) => {
    let searchFeedbackMsg: string;
    await test.step('Enter invalid GitHub Username', async() => {
        await searchPage.enterGitHubUsername('@@@');
    });
    await test.step('Click Go button and validate search feedback message', async() => {
        await searchPage.clickGoButton();
        searchFeedbackMsg = await searchPage.getSearchFeedbackMsg();
        expect(searchFeedbackMsg, 'Github user not found was expected and was not displayed').toEqual('Github user not found');
    });
});

test('Verify repos are displayed when username is valid and has repos available', async ({ searchPage }) => {
    let searchFeedbackMsg: string;
    await test.step('Enter invalid GitHub Username', async() => {
        await searchPage.enterGitHubUsername('hebercardona');
    });
    await test.step('Click Go button', async() => {
        await searchPage.clickGoButton();
        searchFeedbackMsg = await searchPage.getSearchFeedbackMsg();
    });
    await test.step('Validate repos list is not empty', async() => {
        const repos = await searchPage.getRespositoryList();
        expect(repos.length, 'Repositories were expected for this user').toBeGreaterThan(0);
    });
});

test('Verify clicking on specific repo redirects to the correct GitHub url', async ({ searchPage }) => {
    let searchFeedbackMsg: string;
    let repository: Repository;
    await test.step('Enter invalid GitHub Username', async() => {
        await searchPage.enterGitHubUsername('hebercardona');
    });
    await test.step('Click Go button', async() => {
        await searchPage.clickGoButton();
        searchFeedbackMsg = await searchPage.getSearchFeedbackMsg();
    });
    await test.step('Validate repos list is not empty', async() => {
        const repos = await searchPage.getRespositoryList();
        repository = repos[0];
        expect(repos.length, 'Repositories were expected for this user').toBeGreaterThan(0);
    });
    await test.step('Click on repository hyperlink and validate it redirected to correct HitHub repository', async() => {
        await repository.hyperlink.click();
        await expect(searchPage.getPageUrl())
    });
});