class CartPage {
  constructor(page) {
    this.page = page;

    // Cart Item & Checkout Locators
    this.productName = page.getByRole('cell', { name: 'Computing and Internet', exact: true });
    this.qtyInput = page.locator('.qty-input');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async checkout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };