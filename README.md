# ShopHub - E-commerce Application

A modern e-commerce application built with Next.js 16, TypeScript, and shadcn/ui components. This project serves as a QA automation testing assignment for mid to senior-level QA engineers.

## 🚀 Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Testing:** Playwright
- **State Management:** React Context + localStorage

## 📋 Features

### User-Facing Features
- 🏠 Landing page with hero section and feature highlights
- 🛍️ Product catalog with 12+ products across 3 categories
- 🔍 Real-time product search functionality
- 🏷️ Category filtering (Electronics, Furniture, Sports)
- ⬆️ Multiple sorting options (Name, Price, Rating)
- 📦 Product detail pages with quantity selection
- 🛒 Shopping cart with add/remove/update functionality
- 💾 Cart persistence using localStorage
- ✅ Multi-step checkout form with comprehensive validation
- ✨ Order confirmation page
- 📱 Fully responsive design
- 🌙 Dark mode support

### Developer Features
- ✅ TypeScript for type safety
- 🎨 shadcn/ui component library
- 🧪 Playwright E2E testing setup
- 🎯 Extensive data-testid attributes for testing
- 📐 Page Object Model ready structure
- 🔄 Clean component architecture

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone or navigate to the repository**
   ```bash
   cd nextjs-qa-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers** (for E2E testing)
   ```bash
   npx playwright install
   ```

### Running the Application

#### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

#### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

#### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🧪 Testing

### E2E Testing with Playwright

This project includes a complete Playwright setup for end-to-end testing.

#### Run all tests

```bash
npm run test:e2e
```

#### Run tests in UI mode (interactive)

```bash
npm run test:e2e:ui
```

#### Run tests in headed mode (see browser)

```bash
npm run test:e2e:headed
```

#### View test report

```bash
npm run test:report
```

### For QA Engineers

If you're here to complete the QA automation assignment, please refer to:

📖 **[QA_TEST_INSTRUCTIONS.md](./QA_TEST_INSTRUCTIONS.md)**

This comprehensive guide includes:
- Complete assignment objectives
- Required test scenarios
- Page Object Model structure
- Test data reference
- Evaluation criteria
- Best practices and tips

## 📂 Project Structure

```
nextjs-qa-test/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Home page
│   ├── products/            # Product listing and detail pages
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout page
│   ├── confirmation/        # Order confirmation page
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   ├── ui/                  # shadcn/ui components
│   └── Header.tsx           # Navigation header
├── context/                 # React Context providers
│   └── CartContext.tsx      # Shopping cart state management
├── data/                    # Mock data
│   └── products.ts          # Product catalog
├── types/                   # TypeScript type definitions
│   └── product.ts           # Product and checkout types
├── lib/                     # Utility functions
│   └── utils.ts             # Helper utilities
├── tests/                   # Playwright tests (to be implemented)
│   └── example.spec.ts      # Example test file
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🛒 Application Flow

### Complete User Journey

1. **Home** (`/`)
   - Landing page with call-to-action
   - Navigate to products

2. **Products** (`/products`)
   - Browse product catalog
   - Search and filter products
   - Add items to cart
   - View product details

3. **Product Detail** (`/products/[id]`)
   - View detailed product information
   - Select quantity
   - Add to cart

4. **Shopping Cart** (`/cart`)
   - Review cart items
   - Update quantities
   - Remove items
   - Proceed to checkout

5. **Checkout** (`/checkout`)
   - Enter personal information
   - Provide shipping address
   - Enter payment details
   - Form validation
   - Place order

6. **Confirmation** (`/confirmation`)
   - Order success message
   - Order number
   - Next steps

## 🎨 UI Components

This project uses shadcn/ui components including:
- Button
- Card
- Input
- Label
- Select
- Badge

All components are customizable and follow best practices for accessibility.

## 📊 Test Data

### Product Categories
- **Electronics**: Headphones, Smart Watch, Power Bank, Action Camera, Keyboard
- **Furniture**: Office Chair, Standing Desk, LED Lamp
- **Sports**: Yoga Mat, Dumbbell Set, Running Shoes, Water Bottle

### Out of Stock Products
- Product ID: 4 (4K Action Camera)
- Product ID: 9 (Running Shoes)

### Form Validation Rules

**Personal Information:**
- First Name: Required
- Last Name: Required
- Email: Required, valid format
- Phone: Required, 10 digits

**Shipping Address:**
- Address: Required
- City: Required
- State: Required
- ZIP Code: Required, 5 digits

**Payment Information:**
- Card Number: Required, 16 digits
- Cardholder Name: Required
- Expiry Date: Required, MM/YY format
- CVV: Required, 3 digits

## 🎯 Test IDs

All interactive elements include `data-testid` attributes for reliable test automation. Key test IDs include:

- Navigation: `logo`, `products-nav-link`, `cart-button`, `cart-count`
- Products: `search-input`, `category-filter`, `sort-select`, `add-to-cart-{id}`
- Cart: `cart-item-{id}`, `remove-item-{id}`, `checkout-button`
- Checkout: `first-name-input`, `email-input`, `place-order-button`
- And many more...

See [QA_TEST_INSTRUCTIONS.md](./QA_TEST_INSTRUCTIONS.md) for a complete reference.

## 🤝 Contributing

This is a test assignment project. QA engineers should implement tests according to the instructions in `QA_TEST_INSTRUCTIONS.md`.

## 📝 License

This project is created for educational and assessment purposes.

## 🙋 Support

For questions about the assignment or technical issues, please contact the development team lead.

---

**Project Version:** 1.0
**Created:** 2025-11-30
**Purpose:** QA Automation Test Assignment
