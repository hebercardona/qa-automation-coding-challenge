import { Locator, Page } from "@playwright/test";

export class WebActions {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickElement(locator: string): Promise<void> {
        await this.page.locator(locator).waitFor();
        await this.page.locator(locator).click();
    }

    async enterElementText(locator: string, text: string): Promise<void> {
        await this.page.locator(locator).waitFor();
        await this.page.fill(locator, text);
    }

}