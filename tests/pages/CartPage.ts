import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class CartPage extends BasePage {
    readonly youCartIsEmptyMessage: Locator;
    readonly browseProducts: Locator;
    readonly cartItems: Locator;
    readonly cartItemQuantityInput: Locator;
    constructor(page: Page) {
        super(page)
        this.youCartIsEmptyMessage = page.locator("[data-testid='empty-cart'] h1");
        this.browseProducts = page.locator("[data-testid='empty-cart'] button");
        this.cartItems = page.locator("[data-testid^='cart-item-name-']");
        this.cartItemQuantityInput = page.locator("[data-testid^='quantity-input-']");

    }

    async verifycartUrl(): Promise<void> {
        await this.verifyUrl(/\/cart$/);
    }

    async getCartEmptyMessage(): Promise<string> {
        return await this.getElementText(this.youCartIsEmptyMessage);
    }

    

    async verifyCartEmptyMessage(): Promise<void> {
        const expectedMessage = "Your Cart is Empty";
        expect(expectedMessage).toEqual(await this.getCartEmptyMessage())
    }

    async getFirstItemQuantity(): Promise<number> {
    const value = await this.cartItemQuantityInput.first().inputValue();
    return Number(value);
}

}