import { Page } from "@playwright/test";
import { GitHubPageObjects } from "../pageObjects/GitHubPageObjects";
import { WebActions } from "../framework/webActions";
let webActions: WebActions;

export class GitHubPage extends GitHubPageObjects{
    private readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }

    async getRepoName(): Promise<string> {
        return await webActions.getInnerText(GitHubPageObjects.REPO_NAME);
    }

    async getRepoDescription(): Promise<string> {
        return await webActions.getInnerText(GitHubPageObjects.REPO_DESCRIPTION);
    }
}