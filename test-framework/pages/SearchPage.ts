import { BrowserContext, Locator, Page } from "@playwright/test";
import { WebActions } from "../framework/webActions";
import { SearchPageObjects } from "../pageObjects/SearchPageObjects";
import { Repository } from "../framework/ItemTypes";
import { Shared } from "../framework/Shared";
let webActions: WebActions;

export class SearchPage extends SearchPageObjects {

    private readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async getSearchPageHeading(): Promise<string> {
        return await webActions.getInnerText(SearchPageObjects.PAGE_HEADER);
    }

    async clickGoButton(): Promise<void> {
        await webActions.clickElement(SearchPageObjects.INPUT_FORM_GO_BUTTON);
    }

    async enterGitHubUsername(username: string): Promise<void> {
        await webActions.enterText(SearchPageObjects.INPUT_FORM_USERNAME, username);
    }

    async getSearchFeedbackMsg(): Promise<string> {
        return await webActions.getInnerText(SearchPageObjects.SEARCH_FEEDBACK_MSG);
    }

    async getRespositoryList(): Promise<Repository[]> {
        await webActions.waitFor(SearchPageObjects.REPO_LIST_ROWS);
        const reposElements = await webActions.getElements(SearchPageObjects.REPO_LIST_ROWS);
        const repos = await Promise.all(reposElements.map(async x => {
            const repo: Repository = {
                name: await x.locator(SearchPageObjects.REPO_NAME).innerText(),
                description: await x.locator(SearchPageObjects.REPO_DESCRIPTION).innerText(),
                hyperlink: x.locator(SearchPageObjects.REPO_NAME)
            };
            return repo;
        }));
        return repos;
    }

    async getRepositoryWithDescription(): Promise<Repository> {
        const repositoryList = await this.getRespositoryList();
        const withDescription = repositoryList.filter(x => x.description.length > 3);
        const repository = Shared.getAnyFromArray(withDescription);
        return repository;
    }

    async getReposAmount(): Promise<number> {
        const reposAmountText = await webActions.getInnerText(SearchPageObjects.REPO_AMOUNT);
        const amount = reposAmountText.replace(/\D/g, '');
        return parseInt(amount);
    }

    async getPageUrl(): Promise<string> {
        return this.page.url();
    }

    async clickHyperlinkAndGetNewTab(element: Locator, context: BrowserContext): Promise<Page> {
        const pagePromise = context.waitForEvent('page');   
        await element.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }


}