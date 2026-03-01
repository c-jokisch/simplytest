import { Page, Locator } from "@playwright/test";
import { cartLocators } from "../locators/cart.locators";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {


  constructor(page: Page) {
    super( page );
  }

  // ============================================================================
  // LOCATORS
  // ============================================================================

  get cartEmptyMessage(): Locator {
    return this.page.locator(cartLocators.emptyCartMessageClass);
  }

  get updateCartButton(): Locator {
    return this.page.getByRole(
      cartLocators.updateCartButtonRole.role,
      { name: cartLocators.updateCartButtonRole.name }
    );
  }

  get cartSuccessMessage(): Locator {
    return this.page.getByRole(
      cartLocators.successMessageRole.role
    );
  }

  get cartTotalsSubtotal(): Locator {
    return this.page.locator(cartLocators.cartTotalsSubtotal);
  }

  get cartOrderTotal(): Locator {
    return this.page.locator(cartLocators.cartOrderTotal);
  }

  private cartRow(productName: string): Locator {
    return this.page
      .locator(cartLocators.cartRow, { hasText: productName });
  }

  private quantityInput(productName: string): Locator {
    return this.cartRow(productName)
      .locator(cartLocators.quantityInput);
  }

  productSubtotal(productName: string): Locator {
    return this.cartRow(productName)
      .locator(cartLocators.productSubtotal);
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  private async setQuantity(productName: string, quantity: number): Promise<void> {
    const input = this.quantityInput(productName);
    await input.fill(String(quantity));
    await input.dispatchEvent("input");
    await input.dispatchEvent("change");
  }

  private async submitCartUpdate(): Promise<void> {
    await this.updateCartButton.waitFor({ state: 'attached' });
    await this.updateCartButton.click();
  }

  async configureCartForProduct(product: {
    name: string;
    quantity?: number | Record<string, number>;
  }): Promise<void> {

    if (!product.quantity) return;

    if (typeof product.quantity === "number") {
      await this.setQuantity(product.name, product.quantity);
    }

    if (typeof product.quantity === "object") {
      for (const [name, qty] of Object.entries(product.quantity)) {
        await this.setQuantity(name, qty);
      }
    }
 
    await this.submitCartUpdate();
    await this.cartSuccessMessage.waitFor({ state: "visible" });
  }
}