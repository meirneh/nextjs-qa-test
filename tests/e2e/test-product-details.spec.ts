import { test, expect, chromium, Browser, Page, BrowserContext } from "@playwright/test";
import HeaderPage from "../pages/HeaderPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductsDetailsPage";
import CartPage from "../pages/CartPage";

let browser: Browser;
let context: BrowserContext;
let page: Page
let headerPage: HeaderPage;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;
let cartPage: CartPage;

test.describe('testing product details ', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch({ channel: "chrome", slowMo: 500 });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('/');
        headerPage = new HeaderPage(page);
        productsPage = new ProductsPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        cartPage = new CartPage(page);
    })

    test.afterAll(async () => {
        await context?.close();
        await page?.close();
    })

})
