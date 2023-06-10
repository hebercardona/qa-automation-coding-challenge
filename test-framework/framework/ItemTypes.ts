import { Locator } from "@playwright/test"

export type Repository = {
    name: string,
    description: string,
    hyperlink: Locator
}