import { Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class ProductDetailsPage extends BasePage {

    readonly productDetailName: Locator;
    readonly productCategory: Locator;
    readonly productDetailPrice: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    constructor(page: Page) {
        super(page)

        this.productDetailName = page.locator("[data-testid='product-detail-name']");
        this.productCategory = page.locator("[data-testid='product-category']");
        this.productDetailPrice = page.locator("[data-testid='product-detail-price']");
        this.quantityInput = page.locator("[data-testid='product-detail-price']");
        this.addToCartButton = page.locator("[data-testid='add-to-cart-detail']");
    }

    async getProductName(): Promise<string> {
        return await this.getElementText(this.productDetailName);
    }

    async getProductPrice(): Promise<string> {
        return await this.getElementText(this.productDetailPrice);
    }

    async getProductPriceValue(): Promise<number> {
        const text = await this.getElementText(this.productDetailPrice);
        return Number(text.replace(/[^0-9.]/g, ''));
    }



async setQuantity(quantity: number): Promise<void> {
    // Localizamos el input de cantidad por su testid genérico
    const quantityInput = this.page.locator("[data-testid^='quantity-input-']").first();

    // Rellenamos con la cantidad deseada
    await quantityInput.fill(quantity.toString());
}


    async clickAddToCart(): Promise<void> {
        await this.clickElement(this.addToCartButton)
    }


}