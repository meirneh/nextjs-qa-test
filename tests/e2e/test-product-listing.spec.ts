import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import HeaderPage from "../pages/HeaderPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductsDetailsPage";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let headerPage: HeaderPage;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;

test.describe('Products Listing Tests', () => {

    test.beforeEach(async () => {
        browser = await chromium.launch({ channel: "chrome", slowMo: 500 });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('/');
        headerPage = new HeaderPage(page);
        productsPage = new ProductsPage(page);
        productDetailsPage = new ProductDetailsPage(page);
    });

    test.afterAll(async () => {
        await context?.close();
        await page?.close();
    })

    test('TC-05 Verify products listing displays all products', async () => {
        await headerPage.goToProductsPage();
        await productsPage.verifyProductsCount(12);
        await productsPage.verifyVisibleProductsCountInText(12);
        await headerPage.goToHomePage();
    })

    test('TC-06 Verify product card displays name, category, price ', async () => {
        await headerPage.goToProductsPage();
        await productsPage.verifyProductsListIsNotEmpty();
        await productsPage.verifyEachProductHasNameAndPrice();
        await headerPage.goToHomePage();
    })

    test('TC-07 Verify search with valid query returns matching products', async () => {
        await headerPage.goToProductsPage();
        await productsPage.searchProduct("Camera");
        await productsPage.verifyProductsListIsNotEmpty();
        await productsPage.verifyVisibleProductsCountInText(1);
        await productsPage.verifyProductsCount(1);
        await productsPage.verifyAllResultsContain("Camera");
        await productsPage.clearSearchProduct();
        await productsPage.verifyProductsCount(12);
        await productsPage.verifyVisibleProductsCountInText(12);
        await headerPage.goToHomePage();
    })

    test('TC-08 Verify search with no results shows empty state message', async () => {
        await headerPage.goToProductsPage();
        await productsPage.searchProduct("pita");
        await productsPage.verifyVisibleProductsCountInText(0);
        await productsPage.verifyNoProductsMessage()
        await productsPage.clearSearchProduct();
        await productsPage.verifyProductsCount(12);
        await headerPage.goToHomePage();
    })

    test('TC-09 Verify category filter Electronics shows only Electronics products', async () => {
        await headerPage.goToProductsPage();
        await productsPage.selectCategory("Electronics");
        await productsPage.verifyVisibleProductsCountInText(5);
        await productsPage.verifyProductsCount(5);
        await headerPage.goToHomePage();
    })

    test('TC-10 Verify category filter Furniture shows only Furniture products', async () => {
        await headerPage.goToProductsPage();
        await productsPage.selectCategory("Furniture");
        await productsPage.verifyVisibleProductsCountInText(3);
        await productsPage.verifyProductsCount(3);
        await headerPage.goToHomePage();
    })

    test('TC-11 Verify sorting by Name / Price / Rating updates products order', async () => {
        await headerPage.goToProductsPage();
        await productsPage.sortProducts("name");
        await productsPage.verifyProductsSortedByNameAsc();
        await productsPage.sortProducts("price-asc");
        await productsPage.verifyProductsSortedByPriceAsc();
        await productsPage.sortProducts("price-desc");
        await productsPage.verifyProductsSortedByPriceDesc();
        await productsPage.sortProducts("rating");
        await productsPage.verifyProductsSortedByRatingDesc();
        await headerPage.goToHomePage();

    })

    test('TC-12 Verify Add to Cart from listing updates cart badge counter', async () => {
        await headerPage.goToProductsPage();
        await productsPage.addProductToCartByName("Smart Watch Pro");
        console.log("CART COUNT: ", await headerPage.getCartCount());
        await headerPage.verifyCartCount("1");
        await productsPage.addProductToCartByName("Dumbbell Set");
        await headerPage.verifyCartCount("2");
        await headerPage.goToHomePage();

    })


    test('TC-13 Verify “View Details” navigates to correct Product Details page and displays correct price', async () => {
        await headerPage.goToProductsPage();
        const productNameFromListing = await productsPage.getProductNameByIndex(0);
        const productPriceFromListing = await productsPage.getProductPriceByIndex(0); 
        await productsPage.viewDetailsProductByIndex(0);
        const productNameFromDetails = await productDetailsPage.getProductName();
        const productPriceFromDetailsText = await productDetailsPage.getProductPrice(); 
        const toNumber = (priceText: string): number =>
            Number(priceText.replace(/[^0-9.]/g, ''));
        expect(productNameFromDetails.trim()).toBe(productNameFromListing.trim());
        const productPriceFromDetails = toNumber(productPriceFromDetailsText);
        expect(productPriceFromDetails).toBe(productPriceFromListing);
    });


   


















})
