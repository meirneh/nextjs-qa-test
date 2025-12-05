import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class ProductsPage extends BasePage {

    readonly productsHeader: Locator;
    readonly productCards: Locator;
    readonly productsNames: Locator;
    readonly productsPrices: Locator;
    readonly productsRankings: Locator
    readonly viewDetailsButtons: Locator;
    readonly addToCartButton: Locator;
    readonly productCount: Locator;
    readonly searchInputField: Locator;
    readonly noProductsMessage: Locator;
    readonly categoryFilter: Locator;
    readonly sortFilter: Locator;

    constructor(page: Page) {
        super(page)

        this.productsHeader = page.locator("[data-testid='page-title']");
        this.productCards = page.locator("[data-testid^='product-card-']");
        this.productsNames = page.locator("[data-testid^='product-name-']");
        this.productsPrices = page.locator("[data-testid^='product-price-']");
        this.productsRankings = page.locator("[data-testid^='product-rating-']");
        this.viewDetailsButtons = page.locator("[data-testid^='view-details-']");
        this.addToCartButton = page.locator("[data-testid^='add-to-cart-']")
        this.productCount = page.locator("[data-testid='product-count']");
        this.searchInputField = page.locator("[data-testid='search-input']");
        this.noProductsMessage = page.locator("[data-testid='no-products']");
        this.categoryFilter = page.locator("[data-testid='category-filter']");
        this.sortFilter = page.locator("[data-testid='sort-select']");

    }

    async verifyProductsUrl(): Promise<void> {
        await this.verifyUrl(/\/products$/);
    }

    async getProductsHeaderText(): Promise<string> {
        return await this.getElementText(this.productsHeader);
    }

    async verifyProductsHeaderText(): Promise<void> {
        const expectedHeader = "Products";
        expect(expectedHeader).toEqual(await this.getProductsHeaderText());
    }

    async getProductsCardCount(): Promise<number> {
        return await this.countElements(this.productCards);
    }

    async verifyProductsCount(expected: number): Promise<void> {
        const count = await this.getProductsCardCount();
        expect(count).toBe(expected);
    }

    async verifyProductsListIsNotEmpty(): Promise<void> {
        const count = await this.getProductsCardCount();
        expect(count).toBeGreaterThan(0);
    }

    async verifyEachProductHasNameAndPrice(): Promise<void> {
        const count = await this.getProductsCardCount();
        for (let i = 0; i < count; i++) {
            const card = this.productCards.nth(i)
            await expect(card.locator(this.productsNames)).toBeVisible();
            await expect(card.locator(this.productsPrices)).toBeVisible();
            await expect(card.locator(this.productsRankings)).toBeVisible();
        }
    }

    async searchProduct(product: string): Promise<void> {
        await this.fillText(this.searchInputField, product);
    }

    async clearSearchProduct(): Promise<void> {
        await this.fillText(this.searchInputField, '');
    }

    async verifyAllResultsContain(term: string): Promise<void> {
        const count = await this.productCards.count();

        for (let i = 0; i < count; i++) {
            const name = await this.productsNames.nth(i).innerText();
            expect(name.toLowerCase()).toContain(term.toLowerCase())

        }
    }

    async getNoProductsMessage(): Promise<string> {
        return await this.getElementText(this.noProductsMessage);
    }

    async verifyNoProductsMessage(): Promise<void> {
        const expectedMessage = "No products found";
        expect(expectedMessage).toEqual(await this.getNoProductsMessage());
    }

    async verifyVisibleProductsCountInText(expectedVisible: number): Promise<void> {
        await this.waitForElementVisibility(this.productCount);
        const text = await this.getElementText(this.productCount);
        const match = text.match(/Showing\s+(\d+)\s+of/)
        expect(match, `Text "${text}" does not match expected pattern`).not.toBeNull();
        const visibleFromText = Number(match![1]);
        expect(visibleFromText).toBe(expectedVisible);
    }

    // ---------- Helpers internos ----------

    private async getVisibleProductNames(): Promise<string[]> {
        const count = await this.countElements(this.productCards);
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            const name = await this.getElementText(this.productsNames.nth(i));
            names.push(name.trim());
        }

        return names;
    }

    private async getVisibleProductPrices(): Promise<number[]> {
        const count = await this.countElements(this.productCards);
        const prices: number[] = [];

        for (let i = 0; i < count; i++) {
            const priceText = await this.getElementText(this.productsPrices.nth(i));
            // De "₪ 100.00" → 100.00
            const numeric = parseFloat(priceText.replace(/[^0-9.]/g, ""));
            prices.push(numeric);
        }

        return prices;
    }

    private async getVisibleProductRatings(): Promise<number[]> {
        const count = await this.countElements(this.productCards);
        const ratings: number[] = [];

        for (let i = 0; i < count; i++) {
            const ratingText = await this.getElementText(this.productsRankings.nth(i));
            // Extrae el primer número que encuentre, p.ej. "4.5 / 5" → 4.5
            const match = ratingText.match(/[\d.]+/);
            const numeric = match ? parseFloat(match[0]) : 0;
            ratings.push(numeric);
        }

        return ratings;
    }

    // ---------- order verifications ----------

    async verifyProductsSortedByNameAsc(): Promise<void> {
        const names = await this.getVisibleProductNames();
        const sorted = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sorted);
    }

    async verifyProductsSortedByPriceAsc(): Promise<void> {
        const prices = await this.getVisibleProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    }

    async verifyProductsSortedByPriceDesc(): Promise<void> {
        const prices = await this.getVisibleProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    }



    async verifyProductsSortedByRatingDesc(): Promise<void> {
        const ratings = await this.getVisibleProductRatings();
        const sorted = [...ratings].sort((a, b) => b - a);
        expect(ratings).toEqual(sorted);
    }


    async selectCategory(category: string): Promise<void> {
        await this.selectOption(this.categoryFilter, category);
    }

    async sortProducts(value: string): Promise<void> {
        await this.selectOption(this.sortFilter, value);
    }

    async addProductToCartByName(productName: string): Promise<void> {
        const count = await this.countElements(this.productCards);

        for (let i = 0; i < count; i++) {
            const name = await this.getElementText(this.productsNames.nth(i));
            if (name.trim().toLowerCase() === productName.trim().toLowerCase()) {
                await this.clickElement(this.addToCartButton.nth(i));
                return;
            }
        }

        throw new Error(`Product with name "${productName}" was not found in listing`);
    }

    async viewDetailsProductByName(productName: string): Promise<void> {
        const count = await this.countElements(this.productCards);

        for (let i = 0; i < count; i++) {
            const name = await this.getElementText(this.productsNames.nth(i));
            if (name.trim().toLowerCase() === productName.trim().toLowerCase()) {
                await this.clickElement(this.viewDetailsButtons.nth(i));
                return;
            }
        }

        throw new Error(`Product with name "${productName}" was not found in listing`);
    }

    async viewDetailsProductByIndex(index: number): Promise<void> {
        await this.waitForElementVisibility(this.productCards.first(), 1000);

        const count = await this.countElements(this.productCards);

        if (index < 0 || index >= count) {
            throw new Error(
                `Product index ${index} is out of range. Total products: ${count}`
            );
        }

        await this.clickElement(this.viewDetailsButtons.nth(index));
    }
    async getProductNameByIndex(index: number): Promise<string> {
        await this.waitForElementVisibility(this.productCards.first(), 1000);

        const count = await this.countElements(this.productCards);

        if (index < 0 || index >= count) {
            throw new Error(
                `Product index ${index} is out of range. Total products: ${count}`
            );
        }

        const name = await this.getElementText(this.productsNames.nth(index));
        return name.trim();
    }

    async getProductPriceByIndex(index: number): Promise<number> {
        const priceText = await this.productsPrices.nth(index).innerText();

        const numeric = Number(priceText.replace(/[^0-9.]/g, ''));
        return numeric;
    }



}


