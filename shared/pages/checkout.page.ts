import { Page, Locator, expect } from "@playwright/test";
import { checkoutLocators } from "../locators/checkout.locators";
import { BasePage } from "./base.page";

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

export class CheckoutPage extends BasePage  {

  constructor(page: Page) {
    super( page );
  }
 

  // ============================================================================
  // LOCATORS
  // ============================================================================

  public form(): Locator {
    return this.page.locator(checkoutLocators.form.container);
  }

  public errorBox(): Locator {
    return this.page.locator(checkoutLocators.orderReview.errorMonitor);
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
    await this.placeOrderButton().click();
  }

}