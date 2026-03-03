import { Page, Locator, expect } from "@playwright/test";
import { checkoutLocators } from "../locators/checkout.locators";

export interface BillingDetails {
  firstName?: string;
  lastName?: string;
  country?: string;      
  address1?: string;
  city?: string;
  postcode?: string;
  phone?: string;
  email?: string;
  company?: string;
  address2?: string;
  orderNotes?: string;
}

export class CheckoutPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================================
  // LOCATORS
  // ============================================================================

  private form(): Locator {
    return this.page.locator(checkoutLocators.form.container);
  }

  private placeOrderButton(): Locator {
    return this.page.locator(checkoutLocators.form.placeOrderButton);
  }

  // ----- Billing -----

  private firstNameInput(): Locator {
    return this.page.locator(checkoutLocators.billing.firstName);
  }

  private lastNameInput(): Locator {
    return this.page.locator(checkoutLocators.billing.lastName);
  }

  private companyInput(): Locator {
    return this.page.locator(checkoutLocators.billing.company);
  }

  private countrySelect(): Locator {
    return this.page.locator(checkoutLocators.billing.country);
  }

  private address1Input(): Locator {
    return this.page.locator(checkoutLocators.billing.address1);
  }

  private address2Input(): Locator {
    return this.page.locator(checkoutLocators.billing.address2);
  }

  private cityInput(): Locator {
    return this.page.locator(checkoutLocators.billing.city);
  }

  private postcodeInput(): Locator {
    return this.page.locator(checkoutLocators.billing.postcode);
  }

  private phoneInput(): Locator {
    return this.page.locator(checkoutLocators.billing.phone);
  }

  private emailInput(): Locator {
    return this.page.locator(checkoutLocators.billing.email);
  }

  private orderNotesTextarea(): Locator {
    return this.page.locator(checkoutLocators.additional.orderNotes);
  }

  // ----- Payment -----

  private bankTransferRadio(): Locator {
    return this.page.locator(checkoutLocators.payment.methods.bankTransfer);
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  async waitUntilLoaded(): Promise<void> {
    await this.firstNameInput().waitFor({ state: "visible" });
  }

  async fillBillingDetails(data: BillingDetails): Promise<void> {

    await this.firstNameInput().fill(data.firstName);
    await this.lastNameInput().fill(data.lastName);

    if (data.company) {
      await this.companyInput().fill(data.company);
    }

    await this.countrySelect().selectOption(data.country);

    await this.address1Input().fill(data.address1);

    if (data.address2) {
      await this.address2Input().fill(data.address2);
    }

    await this.cityInput().fill(data.city);
    await this.postcodeInput().fill(data.postcode);
    await this.phoneInput().fill(data.phone);
    await this.emailInput().fill(data.email);

    if (data.orderNotes) {
      await this.orderNotesTextarea().fill(data.orderNotes);
    }
  }

  async selectBankTransfer(): Promise<void> {
    await this.bankTransferRadio().check();
  }

  async placeOrder(): Promise<void> {
    await Promise.all([
      this.page.waitForNavigation(),
      this.placeOrderButton().click(),
    ]);
  }

  async expectOrderSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(checkoutLocators.states.successUrl);
  }
}