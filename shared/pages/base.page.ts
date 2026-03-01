import { Page, Locator } from "@playwright/test";
import { globalLocators } from "../locators/global.locators";

export type TBaseContext = {
  page: Page;
};

export class BasePage {
  // ============================================================================
  // PROPERTIES
  // ============================================================================
  protected readonly page: Page;

  // ============================================================================
  // CONSTRUCTOR
  // ============================================================================
  constructor(page: Page) {
    this.page = page;
  }

  public get pageInstance(): Page {
    return this.page;
  }

  // Cart link is intentionally located via stable CSS selector instead of getByRole
  // Due to dynamic content of the cart link (price and badge) which causes getByRole to be unreliable
  get cartLink(): Locator {
    return this.page.locator(globalLocators.cart.link);
  }

  get cartHeaderTotal(): Locator {
    return this.cartLink.locator(globalLocators.cart.price);
  }

  get cartBadge(): Locator {
    return this.cartLink.locator(globalLocators.cart.badge);
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  /**
   * Navigate to a specific path
   */
  async gotoPage(path: string): Promise<void> {
    await this.page.goto(path);
  }
  
}