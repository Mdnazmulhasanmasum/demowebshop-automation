class LoginPage {
  constructor(page) {
    this.page = page;

    // Input fields
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });

    // Buttons & Links
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });

    // Messages
    this.errorMessage = page.locator('.validation-summary-errors');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };