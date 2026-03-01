import { Page, Locator } from "@playwright/test";
import { productLocators } from "../locators/product.locators";

export class ProductPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================================
  // LOCATORS
  // ============================================================================

  private addToCartButton(): Locator {
    return this.page.getByRole("button", { name: productLocators.addToCartButtonRole });
  }

  private successMessage(productName: string): Locator {
    return this.page
      .locator(productLocators.successMessage)
      .filter({ hasText: productName });
  }

  // ============================================================================
  // INTERNAL ACTIONS
  // ============================================================================

  private async waitForVariationReady(): Promise<void> {
    await this.page
      .locator(productLocators.variationWrap)
      .locator(productLocators.variationReadyState)
      .waitFor({ state: "visible" });
  }

  private async goToCartAfterAdd(): Promise<void> {
    const message = this.page.locator(productLocators.successMessage);
    await message.getByRole("link", { name: productLocators.viewCartLinkRole }).click();
  }

  // ============================================================================
  // PUBLIC ACTIONS
  // ============================================================================

  async addSimpleProductToCart(): Promise<void> {
    await this.addToCartButton().click();
  }

  async addVariableProductToCart(
    options: Record<string, string>
  ): Promise<void> {

    for (const [attribute, value] of Object.entries(options)) {
      await this.page
        .locator(productLocators.variationSelect(attribute))
        .selectOption({ value });
    }

    await this.waitForVariationReady();
    await this.addToCartButton().click();
  }

  async addGroupedProductToCart(
    quantities: Record<string, number>
  ): Promise<void> {

    for (const [productName, quantity] of Object.entries(quantities)) {

      const row = this.page.locator(
        productLocators.groupedRow,
        {
          has: this.page.getByRole("link", { name: productName })
        }
      );

      const input = row.locator(productLocators.groupedQuantityInput);

      await input.fill(String(quantity));
    }

    await this.addToCartButton().click();
  }

  async configure(product: any): Promise<void> {

    switch (product.type) {

      case "variable":
        await this.addVariableProductToCart(product.options);
        await this.successMessage(product.name)
          .waitFor({ state: "visible" });
        await this.goToCartAfterAdd();
        break;

      case "grouped":
        await this.addGroupedProductToCart(product.options);
        await this.goToCartAfterAdd();
        break;
    }
  }
}