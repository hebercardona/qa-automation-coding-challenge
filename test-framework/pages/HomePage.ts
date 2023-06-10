import { Page } from "@playwright/test";
import { WebActions } from "../framework/webActions";
import { HomePageObjects } from "../pageObjects/HomePageObjects";
let webActions: WebActions;

export class HomePage extends HomePageObjects {

    private readonly page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
        webActions = new WebActions(this.page);
    }
}