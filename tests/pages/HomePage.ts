import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";
export default class HomePage extends BasePage {

    readonly welcomeTitle: Locator;
    readonly shopNowButton: Locator;
    readonly heroDescription: Locator;
    readonly browseProductsButton: Locator;

    constructor(page: Page) {
        super(page)

        this.welcomeTitle = page.locator("[data-testid='hero-title']");
        this.heroDescription = page.locator("[data-testid='hero-description']");
        this.shopNowButton = page.locator("[data-testid='shop-now-button']");
        this.browseProductsButton = page.locator(".bg-muted.py-16.md\:py-24  a > button");

    }

    async verifyHomeUrl(): Promise<void> {
        await this.verifyUrl(/\/$/);
    }

    async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }

    async verifyHomePageTitle(): Promise<void> {
        const expectedTitle = "ShopHub - E-commerce Store";
        expect(expectedTitle).toEqual(await this.getHomePageTitle());
    }

    async getHomePageHeader(): Promise<string> {
        return await this.getElementText(this.welcomeTitle);
    }

    async verifyHomePageHeader(): Promise<void> {
        const expectedHeader = "Welcome to ShopHub";
        expect(expectedHeader).toEqual(await this.getHomePageHeader());
    }

    async getHeroDescriptionText():Promise<string> {
        return await this.getElementText(this.heroDescription);
    }

    async verifyHeroDescription(): Promise<void> {
        const expectedHeroDescription = "Your one-stop destination for electronics, furniture, and sports equipment"
        expect(expectedHeroDescription).toEqual(await this.getHeroDescriptionText());
    }

    async verifyShopNowIsVisibleAndEnable(): Promise<void> {
        await this.isElementVisible(this.shopNowButton);
        await this.isElementEnable(this.shopNowButton);
    }

    async clickShopNow(): Promise<void> {
        await this.clickElement(this.shopNowButton)

    }

}