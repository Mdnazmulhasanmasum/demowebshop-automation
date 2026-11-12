class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Billing Address Locators
    this.countryDropdown = page.locator('#BillingNewAddress_CountryId');
    this.cityInput = page.locator('#BillingNewAddress_City');
    this.address1Input = page.locator('#BillingNewAddress_Address1');
    this.zipInput = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phoneInput = page.locator('#BillingNewAddress_PhoneNumber');
    this.billingContinueButton = page.locator('#billing-buttons-container .new-address-next-step-button');

    // Step Continue & Confirm Buttons
    this.shippingContinueButton = page.locator('#shipping-buttons-container .new-address-next-step-button');
    this.shippingMethodContinueButton = page.locator('.shipping-method-next-step-button');
    this.paymentMethodContinueButton = page.locator('.payment-method-next-step-button');
    this.paymentInfoContinueButton = page.locator('.payment-info-next-step-button');
    this.confirmOrderButton = page.locator('.confirm-order-next-step-button');

    // Order Confirmation & Details Locators
    this.successMessage = page.getByText('Your order has been successfully processed!');
    this.orderDetailsLink = page.getByRole('link', { name: 'Click here for order details.' });
    this.orderInfoHeading = page.getByText('Order information');
  }

  async fillBillingAddress(country, city, address, zip, phone) {
    await this.countryDropdown.selectOption(country);
    await this.cityInput.fill(city);
    await this.address1Input.fill(address);
    await this.zipInput.fill(zip);
    await this.phoneInput.fill(phone);
    await this.billingContinueButton.click();
  }

  async continueShipping() {
    await this.shippingContinueButton.click();
  }

  async continueShippingMethod() {
    await this.shippingMethodContinueButton.click();
  }

  async continuePaymentMethod() {
    await this.paymentMethodContinueButton.click();
  }

  async continuePaymentInfo() {
    await this.paymentInfoContinueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async openOrderDetails() {
    await this.orderDetailsLink.click();
  }
}

module.exports = { CheckoutPage };