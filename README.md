# Demo Web Shop Automation & API Testing

End-to-end UI automation for [Demo Web Shop](https://demowebshop.tricentis.com/) using **Playwright (JavaScript) with the Page Object Model**, plus API automation for [JSONPlaceholder `/users`](https://jsonplaceholder.typicode.com/users) using **Postman + Newman**.

---

## Tech Stack

| Area | Tools |
|---|---|
| UI automation | Playwright Test (JavaScript), Page Object Model |
| UI reports | Playwright HTML reporter, Allure (`allure-playwright`, `allure-commandline`) |
| API automation | Postman (Collection v2.1), Newman |
| API report | `newman-reporter-htmlextra` |
| Runtime | Node.js (LTS), Java (required by Allure) |

---

## Project Structure

```
demowebshop-automation/
├── pages/                     # Page Objects (locators + actions)
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── SearchPage.js
│   └── CheckoutPage.js
├── tests/                     # UI test scenarios
│   ├── q1-invalid-login.spec.js
│   ├── q2-register-cart.spec.js
│   └── q3-e2e-order.spec.js
├── api-tests/                 # Postman collection (Part C)
│   └── jsonplaceholder-users.postman_collection.json
├── playwright.config.js       # Reporters (list, HTML, Allure), screenshots, baseURL
└── package.json               # npm scripts
```

---

## Test Scenarios

### Part A: UI Automation (demowebshop.tricentis.com)

| # | Scenario | What is verified |
|---|---|---|
| Q1 | Invalid login | Error message is shown, "Log in" link is still visible, "Log out" is not visible |
| Q2 | Register → log in → add product to cart | Registration success, login success, product added notification, correct product name and quantity (1) in cart |
| Q3 | Search → open product → set quantity → add to cart → agree to terms → checkout → confirm order → order details (E2E) | Product appears in search results, quantity (2) in cart, order success message, order details page opens |

Each test registers its own fresh user (unique email via `Date.now()`), so every scenario runs independently.

### Part C: API Automation (jsonplaceholder.typicode.com)

1. **GET `/users`**: status 200, response is a non-empty array, each user has `id`, `name`, `email`; the first user's `id` and data are saved to collection variables.
2. **PUT `/users/{{userId}}`**: updates only `name`, `email` and `company.name` with dynamic values; validates status 200, returned `id` equals the saved `userId`, `phone` is not empty, and returned `name` matches the updated name.

---

## Prerequisites

- [Node.js](https://nodejs.org/) LTS
- [Git](https://git-scm.com/)
- Java 8+ (only needed to generate/open the Allure report)

## Setup

```bash
git clone https://github.com/Mdnazmulhasanmasum/demowebshop-automation.git
cd demowebshop-automation
npm install
npx playwright install chromium
```

---

## Running the UI Tests

| Command | What it runs |
|---|---|
| `npm run test:q1` | Q1 only (invalid login) |
| `npm run test:q2` | Q2 only (register + add to cart) |
| `npm run test:q3` | Q3 only (E2E order) |
| `npm test` | All three scenarios, sequentially (`workers: 1`) |

Tests run in headed Chromium by default (`headless: false` in `playwright.config.js`).

## UI Reports

A screenshot is attached to every test (`screenshot: 'on'`). Both reports are produced on every run.

| Report | Command |
|---|---|
| Playwright HTML report | `npm run report:html` |
| Allure report (generate + open) | `npm run report:allure` |

---

## Running the API Tests

```bash
npm run test:api
```

This runs the collection with Newman and writes an HTML report to `api-tests/report/newman-report.html`.

Equivalent direct command:

```bash
npx newman run api-tests/jsonplaceholder-users.postman_collection.json -r cli,htmlextra --reporter-htmlextra-export api-tests/report/newman-report.html
```

The collection can also be imported into Postman (**Import → select the JSON file**) and run with the Collection Runner.

---

## Git Workflow

Each part of the assignment was developed on its own branch and merged into `main`:

| Branch | Content |
|---|---|
| `q1-invalid-login` | Q1 + LoginPage |
| `q2-register-cart` | Q2 + RegisterPage, ProductPage, CartPage |
| `q3-e2e-order` | Q3 + SearchPage, CheckoutPage |
| `api-tests` | Postman collection + Newman setup |
