# 📘 SQLink – QA Automation Test Suite (Playwright + TypeScript)
### **Author: Meir Nehamkin**
### **Submission Date: December 2025**

## **Overview**
This project contains the automated UI test suite developed for the SQLink QA Automation assignment.  
The automation framework is built using **Playwright + TypeScript**, implemented with a clean, scalable **Page Object Model (POM)** architecture and full **cross-browser support**.

The goal of the assignment was to demonstrate:

- Automation design with Playwright  
- Framework structuring and best practices  
- Locator strategy and UI stability  
- Ability to analyze and prioritize test cases  
- Writing clear, maintainable test code  
- Executing a meaningful subset of the STD under time constraints  

This suite focuses on producing **high-quality, stable, and extensible tests**, rather than maximizing the raw number of automated cases.

---

# 📌 Scope & Prioritization
The original STD includes **41 test cases** across Home, Navigation, Product Listing, Details, Cart, Checkout, and Purchase Flow.

Due to the limited time available, I prioritized:

- **P1 / high-impact areas**
- **Core user journey**
- **Scenarios with the highest regression value**
- **Flows with stable UI elements**
- **Clear architectural foundation**

Instead of implementing all 41 test cases, I delivered **13 fully automated and stable tests**, plus several partial validations.

---

# ✔ Implemented Test Cases (13/41)

## **Home & Navigation**
- **TC-01** – Home page loads successfully  
- **TC-02** – Main sections visible on home page  
- **TC-03** – Navigate to Products page  
- **TC-04** – Header navigation links (Home / Products / Cart)

## **Product Listing**
- **TC-05** – Products listing displays all products  
- **TC-06** – Product card shows correct name, category, price  
- **TC-07** – Search with valid query returns matching items  
- **TC-08** – Search with invalid query returns no results  
- **TC-09** – Category filter “Electronics”  
- **TC-10** – Category filter “Furniture”  
- **TC-11** – Category filter “Sports”  
- **TC-12** – Sorting (A-Z / Z-A / Price / Rating) updates order correctly  
- **TC-13** – “View Details” navigates to correct Product Details page  
  - *Extended with validation of product name & price consistency*

## **Partially Implemented**
- **TC-15** – Product Details shows correct information  
  - *Covered partially inside TC-13 (name & price validation)*  
- **TC-18** – Add to Cart with quantity > 1  
  - *Attempted; not completed due to missing or non-editable quantity input*  

---

# ❌ Not Implemented Test Cases (28/41)
Test cases across Product Details, Cart, Checkout, and Purchase Flow were not implemented due to time constraints or missing UI functionality.

---

# ❗ Why Only 13 Test Cases Were Automated
- **Time limitation**  
- **Quality over quantity**  
- **Some tests require missing UI/backend support**  
- **Architecture and maintainability prioritized over raw volume**

---

# 🧱 Requested Optimizations (Not Fully Implemented)
The assignment also requested fixtures, helpers/utils, removal of hard-coded values, and deep optimization.  
Due to time constraints, these were not fully implemented, but they remain important for:

- Clean data management  
- Reusable flows  
- Reduced brittleness  
- Better maintainability  

---

# 🏗 Framework Architecture
- **Playwright + TypeScript**
- **Page Object Model (POM)**
- Shared `BasePage` utilities  
- Folder structure:

```
tests/
  e2e/
  pages/
  helpers/
  fixture/
playwright.config.ts
```

- Cross-browser execution (Chromium, Firefox, WebKit)
- Stable locator strategy using roles & data-testids

---

# ▶️ How to Install & Run the Tests

### Install dependencies
```
npm install
npx playwright install
```

### Run all tests
```
npx playwright test
```

### Run specific browser
```
npx playwright test --project=chromium
```

### Run a single test
```
npx playwright test tests/e2e/test-product-listing.spec.ts --project=chromium
```

### View report
```
npx playwright show-report
```

---

# 📊 Final Coverage Summary
| Category | Implemented | Pending |
|---------|-------------|---------|
| Home & Navigation | 4 | 0 |
| Product Listing | 9 | 0 |
| Product Details | 1 (partial) | 5 |
| Cart | 0 | 8 |
| Checkout | 0 | 9 |
| Purchase Flow | 0 | 3 |
| **Total** | **13 / 41 implemented** | **28 remaining** |

---

# ⭐ End of README
