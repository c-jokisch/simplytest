import { Page, Locator } from "@playwright/test";
import { cartLocators } from "../locators/cart.locators";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ============================================================================
  // LOCATORS
  // ============================================================================

  get cartEmptyMessage(): Locator {
    return this.page.locator(cartLocators.emptyMessage);
  }

  get updateCartButton(): Locator {
    return this.page.getByRole("button", {
      name: cartLocators.actions.updateButtonName,
    });
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
    return this.page.locator(cartLocators.row.container, {
      hasText: productName,
    });
  }

  private async quantityInput(productName: string): Promise<Locator> {
    return this.cartRow(productName).getByRole("spinbutton", {
      name: "Product quantity",
    });
  }

  productSubtotal(productName: string): Locator {
    return this.cartRow(productName).locator(cartLocators.row.subtotal);
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  private async setQuantity(
    productName: string,
    quantity: number,
  ): Promise<void> {
    const input = await this.quantityInput(productName);
    await input.click();
    await input.clear();
    // await input.press("Meta+A"); // you could use this, but I wouldn't since this is very specific, and no user really does that, if anything you could hit backspace, but even that would be brittle
    await input.press(String(quantity));
    await input.blur();
    console.log(quantity);
  }

  private async submitCartUpdate(): Promise<void> {
    await this.updateCartButton.isEnabled();
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
