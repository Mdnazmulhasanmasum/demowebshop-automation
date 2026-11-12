class CartPage {
  constructor(page) {
    this.page = page;

    // Cart Item Locators
    this.productName = page.getByRole('cell', { name: 'Computing and Internet', exact: true });
    this.qtyInput = page.locator('.qty-input');
  }
}

module.exports = { CartPage };