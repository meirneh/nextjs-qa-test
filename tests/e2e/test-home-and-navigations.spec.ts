import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import HeaderPage from "../pages/HeaderPage";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let headerPage: HeaderPage;
let homePage: HomePage;
let productsPage: ProductsPage;
let cartPage: CartPage;

test.describe('test home and navegations ', () => {
    test.beforeEach(async () => {
        browser = await chromium.launch({ channel: "chrome", slowMo: 500 });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('/');
        headerPage = new HeaderPage(page);
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
    });

    test.afterEach(async () => {
        await context?.close();
        await page?.close();
    })

    test('TC-01 Verify home page loads successfully', async () => {
        await homePage.verifyHomeUrl();
        await homePage.verifyHomePageTitle();

    })

    test('TC-02 Verify main sections are visible on home page ', async () => {
        await headerPage.verifyLogoIsVisibleAndEnable();
        await headerPage.verifyProductsLinkIsVisibleAndEnable();
        await headerPage.verifyAddToCartButton();
        await homePage.verifyHomePageTitle();
        await homePage.verifyHeroDescription();
        await homePage.verifyShopNowIsVisibleAndEnable();

    })

    test('TC-03 Verify "Shop Now/ Browse Products" navigates to Products Page', async () => {
        await homePage.clickShopNow();
        await productsPage.verifyProductsUrl();
        await productsPage.verifyProductsHeaderText();
        await productsPage.verifyProductsListIsNotEmpty()
        await headerPage.goToHomePage();

    })

    test('TC-04 Verify header navigation links: Home, Products, Cart', async () => {
        await headerPage.goToProductsPage();
        await productsPage.verifyProductsUrl();
        await productsPage.verifyProductsHeaderText();
        await productsPage.verifyProductsListIsNotEmpty();
        await headerPage.goToCartPage();
        await cartPage.verifycartUrl();
        await cartPage.verifyCartEmptyMessage();
        await headerPage.goToHomePage(); 
        
    })




})
