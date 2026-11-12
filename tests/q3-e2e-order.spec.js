const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Q3: E2E search, add to cart, checkout and verify order', async ({ page }) => {
  // Test data & Page objects
  const email = `user${Date.now()}@test.com`;
  const password = 'Password123!';

  const registerPage = new RegisterPage(page);
  const searchPage = new SearchPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Register
  await registerPage.goto();
  await registerPage.register('Test', 'User', email, password);
  await expect(registerPage.successMessage).toBeVisible();

  // 2. Search product
  await searchPage.search('Computing');
  await expect(searchPage.productLink).toBeVisible();
  await searchPage.openProduct();

  // 3. Quantity & Cart
  await productPage.setQuantity(2);
  await productPage.addToCart();
  await expect(productPage.successNotification).toBeVisible();

  await productPage.goToCart();
  await expect(cartPage.qtyInput).toHaveValue('2');
  await cartPage.checkout();

  // 4. Checkout steps
  await checkoutPage.fillBillingAddress('Bangladesh', 'Dhaka', 'House 1, Road 1', '1207', '01700000000');
  await checkoutPage.continueShipping();
  await checkoutPage.continueShippingMethod();
  await checkoutPage.continuePaymentMethod();
  await checkoutPage.continuePaymentInfo();
  await checkoutPage.confirmOrder();

  // 5. Verify order
  await expect(checkoutPage.successMessage).toBeVisible();
  await checkoutPage.openOrderDetails();
  await expect(checkoutPage.orderInfoHeading).toBeVisible();
});