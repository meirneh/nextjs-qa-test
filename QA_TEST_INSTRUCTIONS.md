# QA Automation Test Assignment - ShopHub E-commerce

## 📋 Overview

Welcome to the ShopHub QA Automation Test Assignment! This document contains detailed instructions for implementing end-to-end (E2E) automated tests using Playwright for a Next.js e-commerce application.

**Time Allocation:** 4-6 hours
**Technology Stack:** Next.js 18, TypeScript, Playwright, shadcn/ui

---

## 🎯 Assignment Objectives

Your task is to implement a comprehensive E2E test suite that covers the complete user journey through the ShopHub e-commerce application, from browsing products to completing a purchase.

### Key Goals:
- Demonstrate proficiency with Playwright test framework
- Implement Page Object Model (POM) design pattern
- Write maintainable, reusable, and well-structured test code
- Implement proper assertions and validations
- Handle asynchronous operations correctly
- Create clear and meaningful test reports

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Clone/Access the repository**
   ```bash
   # Navigate to the project directory
   cd nextjs-qa-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (if not already installed)
   ```bash
   npx playwright install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

5. **Verify Playwright setup**
   ```bash
   npm run test:e2e
   ```
   This should run the example tests provided.

---

## 📱 Application Overview

### User Flow
The ShopHub application implements a typical e-commerce flow:

1. **Home Page** (`/`)
   - Landing page with hero section
   - Call-to-action buttons to browse products
   - Feature highlights

2. **Products Listing** (`/products`)
   - Display all available products
   - Search functionality
   - Category filtering (All, Electronics, Furniture, Sports)
   - Sorting options (Name, Price Low-High, Price High-Low, Rating)
   - Add to cart from listing
   - Navigate to product details

3. **Product Detail** (`/products/[id]`)
   - Detailed product information
   - Quantity selector
   - Add to cart with quantity
   - Navigate back to products

4. **Shopping Cart** (`/cart`)
   - View cart items
   - Update item quantities
   - Remove items
   - View order summary (subtotal, tax, total)
   - Proceed to checkout

5. **Checkout** (`/checkout`)
   - Personal information form
   - Shipping address form
   - Payment information form
   - Form validation
   - Order summary
   - Place order

6. **Order Confirmation** (`/confirmation`)
   - Success message
   - Order number
   - Next steps information

### Key Features to Test
- Navigation between pages
- Search and filter functionality
- Add/remove items from cart
- Cart state persistence (localStorage)
- Form validation with various scenarios
- Complete purchase flow
- Responsive design elements

---

## 📝 Test Requirements

### Required Test Scenarios

You must implement tests for the following scenarios. Feel free to add additional test cases to demonstrate your expertise.

#### 1. Home Page Tests
- [ ] Verify home page loads successfully
- [ ] Check all main sections are visible
- [ ] Test "Shop Now" navigation to products page
- [ ] Verify navigation links in header

#### 2. Product Listing Tests
- [ ] Verify products are displayed correctly
- [ ] Test search functionality with valid queries
- [ ] Test search with no results
- [ ] Test category filtering for each category
- [ ] Test sorting by different options
- [ ] Verify product count updates based on filters
- [ ] Test "Add to Cart" from product listing
- [ ] Verify cart count badge updates
- [ ] Test navigation to product detail page

#### 3. Product Detail Tests
- [ ] Verify product details are displayed correctly
- [ ] Test quantity increment/decrement
- [ ] Test quantity manual input
- [ ] Test "Add to Cart" with different quantities
- [ ] Verify navigation to cart after adding item
- [ ] Test back navigation to products
- [ ] Verify out-of-stock products cannot be added to cart

#### 4. Shopping Cart Tests
- [ ] Verify cart displays all added items
- [ ] Test quantity update for cart items
- [ ] Test item removal from cart
- [ ] Verify cart calculations (subtotal, tax, total)
- [ ] Test empty cart state
- [ ] Test "Continue Shopping" navigation
- [ ] Test "Proceed to Checkout" navigation
- [ ] Verify cart persistence after page reload

#### 5. Checkout Form Validation Tests
- [ ] Test submission with all fields empty (display all errors)
- [ ] Test email validation (invalid format)
- [ ] Test phone number validation (less than 10 digits)
- [ ] Test ZIP code validation (not 5 digits)
- [ ] Test card number validation (not 16 digits)
- [ ] Test CVV validation (not 3 digits)
- [ ] Test expiry date validation (invalid format)
- [ ] Verify error messages clear when user types
- [ ] Test successful form submission with valid data

#### 6. End-to-End Purchase Flow Tests
- [ ] Complete purchase flow: Home → Products → Product Detail → Cart → Checkout → Confirmation
- [ ] Add multiple products and complete checkout
- [ ] Verify order confirmation page displays correctly
- [ ] Verify cart is cleared after successful purchase

#### 7. Bonus/Advanced Tests (Optional but Recommended)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsive testing
- [ ] Test localStorage persistence across sessions
- [ ] API mocking for checkout submission
- [ ] Visual regression testing
- [ ] Accessibility testing
- [ ] Performance testing

---

## 🏗️ Project Structure

Organize your test code following this recommended structure:

```
tests/
├── e2e/
│   ├── home.spec.ts
│   ├── products.spec.ts
│   ├── product-detail.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── full-flow.spec.ts
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ConfirmationPage.ts
├── fixtures/
│   └── testData.ts
└── helpers/
    └── utils.ts
```

### Page Object Model Implementation

Implement the Page Object Model pattern for all pages. Here's an example structure:

```typescript
// tests/pages/BasePage.ts
import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path);
  }

  async getTitle() {
    return await this.page.title();
  }
}

// tests/pages/ProductsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByTestId('search-input');
    this.categoryFilter = page.getByTestId('category-filter');
    this.sortSelect = page.getByTestId('sort-select');
  }

  async searchProducts(query: string) {
    await this.searchInput.fill(query);
  }

  async selectCategory(category: string) {
    await this.categoryFilter.selectOption(category);
  }

  async addProductToCart(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  // Add more methods as needed
}
```

---

## 🧪 Testing Best Practices

### 1. Use Data-TestId Attributes
All interactive elements have `data-testid` attributes. Use these for stable selectors:
```typescript
await page.getByTestId('checkout-button').click();
```

### 2. Implement Proper Waits
Use Playwright's auto-waiting, but add explicit waits when needed:
```typescript
await page.waitForLoadState('networkidle');
await expect(page.getByTestId('product-card-1')).toBeVisible();
```

### 3. Use Fixtures for Test Data
Create reusable test data in `fixtures/testData.ts`:
```typescript
export const validCheckoutData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  // ... more fields
};
```

### 4. Group Related Tests
Use `test.describe()` to group related test cases:
```typescript
test.describe('Product Search', () => {
  test('should find products by name', async ({ page }) => {
    // test implementation
  });

  test('should show no results for invalid search', async ({ page }) => {
    // test implementation
  });
});
```

### 5. Clean State Between Tests
Ensure each test starts with a clean state:
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});
```

### 6. Write Clear Assertions
Use descriptive assertion messages:
```typescript
await expect(page.getByTestId('cart-count')).toHaveText('3', {
  message: 'Cart should show 3 items after adding products'
});
```

### 7. Handle Asynchronous Operations
Always await asynchronous operations:
```typescript
await page.getByTestId('checkout-button').click();
await expect(page).toHaveURL(/\/checkout/);
```

---

## 📊 Test Data Reference

### Available Products
The application contains 12 products across 3 categories:
- **Electronics** (IDs: 1, 2, 3, 4, 11)
- **Furniture** (IDs: 5, 6, 12)
- **Sports** (IDs: 7, 8, 9, 10)

Note: Products with IDs 4 and 9 are **out of stock**.

### Validation Rules

#### Personal Information
- **First Name**: Required
- **Last Name**: Required
- **Email**: Required, valid email format
- **Phone**: Required, 10 digits

#### Shipping Address
- **Address**: Required
- **City**: Required
- **State**: Required
- **ZIP Code**: Required, 5 digits

#### Payment Information
- **Card Number**: Required, 16 digits
- **Cardholder Name**: Required
- **Expiry Date**: Required, MM/YY format
- **CVV**: Required, 3 digits

---

## 🎨 Available Test IDs

All key elements have `data-testid` attributes. Here are the main ones:

### Navigation
- `logo` - ShopHub logo
- `products-nav-link` - Products navigation link
- `cart-button` - Shopping cart button
- `cart-count` - Cart item count badge

### Products Page
- `page-title` - Page title
- `search-input` - Search input field
- `category-filter` - Category dropdown
- `sort-select` - Sort dropdown
- `product-card-{id}` - Product card
- `product-name-{id}` - Product name
- `product-price-{id}` - Product price
- `add-to-cart-{id}` - Add to cart button
- `view-details-{id}` - View details button
- `product-count` - Product count text

### Product Detail Page
- `back-button` - Back to products button
- `product-detail-name` - Product name
- `product-detail-price` - Product price
- `quantity-input` - Quantity input
- `increase-quantity` - Increase quantity button
- `decrease-quantity` - Decrease quantity button
- `add-to-cart-detail` - Add to cart button

### Cart Page
- `cart-title` - Cart page title
- `empty-cart` - Empty cart message
- `cart-item-{id}` - Cart item
- `remove-item-{id}` - Remove item button
- `quantity-input-{id}` - Quantity input
- `subtotal` - Subtotal amount
- `tax` - Tax amount
- `total` - Total amount
- `checkout-button` - Proceed to checkout button

### Checkout Page
- `checkout-title` - Checkout page title
- `first-name-input` - First name field
- `last-name-input` - Last name field
- `email-input` - Email field
- `phone-input` - Phone field
- `address-input` - Address field
- `city-input` - City field
- `state-input` - State field
- `zip-input` - ZIP code field
- `card-number-input` - Card number field
- `card-name-input` - Cardholder name field
- `expiry-input` - Expiry date field
- `cvv-input` - CVV field
- `place-order-button` - Place order button
- `{field}-error` - Error message for each field

### Confirmation Page
- `confirmation-title` - Confirmation title
- `order-number` - Order number
- `success-icon` - Success checkmark icon

---

## 🏃 Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run tests in UI mode (recommended for development)
```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:e2e:headed
```

### Run specific test file
```bash
npx playwright test tests/e2e/products.spec.ts
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
```

### Generate test report
```bash
npm run test:report
```

### Debug tests
```bash
npx playwright test --debug
```

---

## 📤 Deliverables

### Required Submissions

1. **Complete Test Suite**
   - All test files organized in the `tests/` directory
   - Page Object Model implementation
   - Test fixtures and helper utilities
   - Clear and descriptive test names

2. **Test Report**
   - Screenshot or HTML report of all test results
   - Must show all tests passing (green)
   - Include test execution summary

3. **Documentation** (README.md in tests folder)
   - Brief overview of your test architecture
   - How to run the tests
   - Any assumptions made
   - Challenges faced and how you solved them
   - Additional features implemented (if any)

4. **Code Quality**
   - Well-commented code where necessary
   - Consistent code style and formatting
   - DRY (Don't Repeat Yourself) principles
   - Proper TypeScript types

---

## ✅ Evaluation Criteria

Your submission will be evaluated based on:

### 1. Test Coverage (30%)
- All required test scenarios implemented
- Edge cases covered
- Negative testing scenarios

### 2. Code Quality (25%)
- Clean, readable, and maintainable code
- Proper use of TypeScript
- Consistent naming conventions
- Code organization and structure

### 3. Page Object Model Implementation (20%)
- Proper abstraction of page elements
- Reusable page methods
- Clear separation of concerns
- Inheritance and composition

### 4. Best Practices (15%)
- Proper use of Playwright features
- Effective use of test hooks (beforeEach, afterEach)
- Proper assertions
- Error handling

### 5. Documentation (10%)
- Clear README
- Code comments where necessary
- Test descriptions

---

## 💡 Tips and Hints

1. **Start Small**: Begin with simple tests and gradually add complexity
2. **Use Playwright Inspector**: `npx playwright test --debug` is your friend
3. **Check the Network Tab**: Understand what requests are being made
4. **Leverage Auto-Waiting**: Playwright automatically waits for elements
5. **Test Isolation**: Each test should be independent
6. **Use Screenshots**: Add screenshots on failure for debugging
7. **Trace Viewer**: Use trace viewer for debugging failed tests
8. **Read Playwright Docs**: https://playwright.dev/docs/intro

---

## 🔍 Common Pitfalls to Avoid

1. ❌ Using hardcoded waits (`page.waitForTimeout()`)
2. ❌ Not handling asynchronous operations properly
3. ❌ Tightly coupling tests to implementation details
4. ❌ Not cleaning up state between tests
5. ❌ Using fragile selectors (XPath with index numbers)
6. ❌ Not verifying state changes after actions
7. ❌ Writing overly long tests that test too many things

---

## 📚 Additional Resources

### Playwright Documentation
- [Playwright Official Docs](https://playwright.dev/)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)

### Next.js Documentation
- [Next.js Routing](https://nextjs.org/docs/app/building-your-application/routing)
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## ❓ FAQ

**Q: Can I use additional npm packages?**
A: Yes, but justify their use in your documentation. Playwright should handle most needs.

**Q: How should I handle the form submission delay?**
A: Use Playwright's built-in waiting mechanisms. The checkout page has a simulated 2-second delay.

**Q: Should I test on multiple browsers?**
A: Chromium is required. Testing on Firefox and WebKit is bonus points.

**Q: Can I modify the application code?**
A: No, only create tests. The application code should remain unchanged.

**Q: How detailed should my test descriptions be?**
A: Clear enough that a non-technical person could understand what's being tested.

**Q: What if I find a bug in the application?**
A: Document it in your README and write a test that demonstrates the bug.

---

## 📞 Support

If you encounter issues with the setup or have questions about the requirements, please reach out to the development team lead.

---

## 🎓 Final Notes

This assignment is designed to assess your:
- Technical skills with Playwright and TypeScript
- Understanding of E2E testing best practices
- Ability to write maintainable test code
- Problem-solving approach
- Attention to detail
- Communication through code and documentation

Take your time, write quality tests, and demonstrate your expertise!

**Good luck! 🚀**

---

**Assignment Version:** 1.0
**Last Updated:** 2025-11-30
**Estimated Completion Time:** 4-6 hours
