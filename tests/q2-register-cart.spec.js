const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { LoginPage } = require('../pages/LoginPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test('Q2: register, login and add product to cart', async ({ page }) => {
  // Test data & Page objects
  const email = `user${Date.now()}@test.com`;
  const password = 'Password123!';

  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Register
  await registerPage.goto();
  await registerPage.register('Test', 'User', email, password);
  await expect(registerPage.successMessage).toBeVisible();

  // Logout & Login
  await loginPage.logoutLink.click();
  await loginPage.goto();
  await loginPage.login(email, password);
  await expect(loginPage.logoutLink).toBeVisible();

  // Product
  await productPage.openBooksCategory();
  await productPage.openProduct();
  await productPage.addToCart();
  await expect(productPage.successNotification).toBeVisible();

  // Cart verification
  await productPage.goToCart();
  await expect(cartPage.productName).toBeVisible();
  await expect(cartPage.qtyInput).toHaveValue('1');
});