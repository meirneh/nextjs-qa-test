import { expect, Locator, Page } from "@playwright/test"
import BasePage from "./BasePage";

export default class HeaderPage extends BasePage {
    readonly logoTitle: Locator;
    readonly productsLink: Locator;
    readonly addToCartButton: Locator;
    readonly cartCount: Locator;

    constructor(page: Page) {
        super(page)

        this.logoTitle = page.locator("[data-testid='logo']");
        this.productsLink = page.locator("[data-testid='products-nav-link']");
        this.addToCartButton = page.locator("[data-testid='cart-button']");
        this.cartCount = page.locator("[data-testid='cart-count']");

    }

    async verifyLogoIsVisibleAndEnable(): Promise<void> {
        await this.isElementVisible(this.logoTitle);
        await this.isElementEnable(this.logoTitle);
    }

    async verifyProductsLinkIsVisibleAndEnable(): Promise<void> {
        await this.isElementVisible(this.productsLink);
        await this.isElementEnable(this.productsLink);
    }

    async verifyAddToCartButton(): Promise<void> {
        await this.isElementVisible(this.addToCartButton);
    }

    async goToProductsPage(): Promise<void> {
        await this.clickElement(this.productsLink);
    }

    async goToHomePage(): Promise<void> {
        await this.clickElement(this.logoTitle);
    }

    async goToCartPage(): Promise<void> {
        await this.clickElement(this.addToCartButton);
    }

    async getCartCount(): Promise<string> {
        return await this.getElementText(this.cartCount);
    }

    async verifyCartCount(expectedCount: string): Promise<void> {
        const actualCount = await this.getCartCount()
        expect(expectedCount).toEqual(actualCount);
    }

    
}