class RegisterPage {
  constructor(page) {
    this.page = page;

    // Radio & Input fields
    this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name:' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name:' });
    this.emailInput = page.getByRole('textbox', { name: 'Email:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm password:' });

    // Buttons & Messages
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successMessage = page.getByText('Your registration completed');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(firstName, lastName, email, password) {
    await this.maleRadio.check();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registerButton.click();
  }
}

module.exports = { RegisterPage };