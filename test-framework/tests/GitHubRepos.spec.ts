import { test, expect } from "../fixtures/BaseTest";
import { Repository } from "../framework/ItemTypes";
import { Shared } from "../framework/Shared";
import { GitHubPage } from "../pages/GitHubPage";

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

test('Verify search works with enter key', async ({ searchPage, page }) => {
    let searchFeedbackMsg: string;
    await test.step('Enter invalid GitHub Username', async() => {
        await searchPage.enterGitHubUsername('hebercardona');
    });
    await test.step('Press enter and verify search results and feedback message', async() => {
        await page.keyboard.press('Enter');
        searchFeedbackMsg = await searchPage.getSearchFeedbackMsg();
        expect(searchFeedbackMsg, 'Feedback Message not displayed on search with enter key').toContain('Success!');
        const repos = await searchPage.getRespositoryList();
        expect(repos.length, 'Repositories were expected for this user').toBeGreaterThan(0);
    });
});

test('Verify clicking on any repo redirects to the correct GitHub url', async ({ searchPage, context }) => {
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
        repository = Shared.getAnyFromArray(repos);
        expect(repos.length, 'Repositories were expected for this user').toBeGreaterThan(0);
    });
    await test.step('Click on repository hyperlink and validate it redirected to correct GitHub repository', async() => {
        const newPage = await searchPage.clickHyperlinkAndGetNewTab(repository.hyperlink, context);
        expect(newPage.url()).toContain(repository.name);
        const githubPage = new GitHubPage(newPage);
        const github_repo_name = await githubPage.getRepoName();
        expect(github_repo_name, 'Respository name did not match.').toEqual(repository.name);
    });
});

test('Verify repository description matches GitHub repository description', async ({ searchPage, context }) => {
    let repository: Repository;
    await test.step('Enter invalid GitHub Username', async() => {
        await searchPage.enterGitHubUsername('hebercardona');
    });
    await test.step('Click Go button', async() => {
        await searchPage.clickGoButton();
    });
    await test.step('Get a repository with description', async() => {
        repository = await searchPage.getRepositoryWithDescription();
    });
    await test.step('Click on repository hyperlink and validate it redirected to correct GitHub repository', async() => {
        const newPage = await searchPage.clickHyperlinkAndGetNewTab(repository.hyperlink, context);
        expect(newPage.url()).toContain(repository.name);
        const githubPage = new GitHubPage(newPage);
        const github_repo_description = await githubPage.getRepoDescription();
        expect(github_repo_description, 'Respository description did not match.').toEqual(repository.description);
    });
});

test('Verify repository amount label matches repository list item count', async ({ searchPage, context }) => {
    let repository: Repository;
    await test.step('Enter invalid GitHub Username', async() => {
        await searchPage.enterGitHubUsername('hebercardona');
    });
    await test.step('Click Go button', async() => {
        await searchPage.clickGoButton();
    });
    await test.step('Get output repository list and compare with the amount label', async() => {
        const repositories = await searchPage.getRespositoryList();
        const amountLabel = await searchPage.getReposAmount();
        expect(repositories.length, 'Repositories list count and amount label does not match').toEqual(amountLabel);
    });
});