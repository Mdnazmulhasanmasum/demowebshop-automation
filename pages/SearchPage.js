class SearchPage {
  constructor(page) {
    this.page = page;

    // Search locators
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.search-box-button');
    this.productLink = page.locator('.product-title').getByRole('link', { name: 'Computing and Internet', exact: true });
  }

  async search(text) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }

  async openProduct() {
    await this.productLink.click();
  }
}

module.exports = { SearchPage };