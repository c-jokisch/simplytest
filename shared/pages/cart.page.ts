import { Page, Locator, expect } from "@playwright/test";
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
    return this.page.locator(cartLocators.emptyMessage);
  }

  get updateCartButton(): Locator {
    return this.page.getByRole('button', { name: cartLocators.actions.updateButtonName });
  }

  get cartSuccessMessage(): Locator {
    return this.page.getByRole("alert");
  }

  get cartTotalsSubtotal(): Locator {
    return this.page.locator(cartLocators.totals.subtotal);
  }

  get cartOrderTotal(): Locator {
    return this.page.locator(cartLocators.totals.orderTotal);
  }

  private cartRow(productName: string): Locator {
    return this.page.locator(cartLocators.row.container, { hasText: productName });
  }

  private quantityInput(productName: string): Locator {
    return this.cartRow(productName).getByRole("spinbutton", { name: cartLocators.actions.updateQuantity });
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  // Note: application does not react reliably on fill()-operations 
private async setQuantity(productName: string, quantity: number): Promise<void> {
  const input = this.quantityInput(productName);

    // Ensure the quantity input is rendered and interactable before setting the value
    await input.waitFor({ state: "visible" });

    // Note: waitforEnabled works for all browsers reliably except for webkit 
    // Button gets enabled and then disabled

    // Clear the existing value and type the new quantity with a slight delay to mimic user input
    await input.clear();
    await input.type(String(quantity), { delay: 50 });

    // Clicking outside the input to trigger any change events
    // But: not authentic user interaction
    await input.press('Tab');
    // Exception as there is a need to make sure the button is enabled 
    await expect(input).toHaveValue(String(quantity));
    await expect(this.updateCartButton).toBeEnabled();

  }

  async configureCartForProduct(product: { name: string; quantity?: number | Record<string, number>; }): Promise<void> {

    if (!product.quantity) return;

    if (typeof product.quantity === "number") {
      await this.setQuantity(product.name, product.quantity);
    }

    if (typeof product.quantity === "object") {
      for (const [name, qty] of Object.entries(product.quantity)) {
        await this.setQuantity(name, qty);
      }
    }

    await this.updateCartButton.click();
    await this.cartSuccessMessage.waitFor({ state: "visible" });
  }
}