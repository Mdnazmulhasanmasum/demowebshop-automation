class ProductPage {
  constructor(page) {
    this.page = page;

    // Navigation & Product Links
    this.booksLink = page.getByRole('link', { name: 'Books' }).first();
    this.productLink = page.getByRole('link', { name: 'Computing and Internet', exact: true });

    // Cart Actions & Notification
    this.addToCartButton = page.locator('#add-to-cart-button-13');
    this.successNotification = page.getByText('The product has been added to');
    this.cartLink = page.getByRole('link', { name: 'Shopping cart' }).first();
  }

  async openBooksCategory() {
    await this.booksLink.click();
  }

  async openProduct() {
    await this.productLink.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { ProductPage };