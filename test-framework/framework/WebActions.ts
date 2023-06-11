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

    async enterText(locator: string, text: string): Promise<void> {
        await this.page.locator(locator).waitFor();
        await this.page.fill(locator, text);
    }

    async getInnerText(locator: string): Promise<string> {
        await this.page.locator(locator).first().waitFor();
        return this.page.locator(locator).innerText();
    }

    async getElements(locator: string): Promise<Locator[]> {
        let elementList: Locator[] = [];
        const elements = this.page.locator(locator);
        for (let i = 0; i < await elements.count(); i++) {
            elementList.push(elements.nth(i));
        }
        return elementList;
    }

    async waitFor(locator: string): Promise<void> {
        await this.page.locator(locator).first().waitFor();
    }

}