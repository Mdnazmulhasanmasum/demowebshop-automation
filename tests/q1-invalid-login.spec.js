const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Q1: invalid login shows error and user stays logged out', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wronguser@example.com', 'WrongPass123');

  // Assertions
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Login was unsuccessful');
  await expect(loginPage.loginLink).toBeVisible();
  await expect(loginPage.logoutLink).not.toBeVisible();
});