import { Page, Locator } from "@playwright/test";
import { productLocators } from "../locators/product.locators";
import { shopLocators } from "../locators/shop.locators";

export class ProductPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================================
  // LOCATORS
  // ============================================================================

  private addToCartButton(): Locator {
    return this.page.getByRole("button", { name: productLocators.actions.addToCartButtonName });
  }

  private viewCartLink(): Locator {
    return this.successBanner().getByRole("link", { name: productLocators.actions.viewCartLinkName });
  }

  private groupedRow(productName: string): Locator {
    return this.page.locator(productLocators.grouped.row, { has: this.page.getByRole("link", { name: productName }) });
  }

  // Note: No filter for productname as it varies depending on the product type
  private successBanner(): Locator {
    return this.page.locator(productLocators.messages.success);
  }

  private groupedQuantityInput(productName: string): Locator {
    return this.groupedRow(productName).locator(productLocators.grouped.quantityInput);
}

  private viewCartLinkbyProduct(productName: string): Locator {
    return this.productContainer(productName).getByRole("link", { name: shopLocators.product.buttons.viewCart });
  }
  
   private productContainer(productName: string): Locator {
    return this.page.locator(shopLocators.product.container).filter({ has: this.page.getByRole("heading", { name: productName })});
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

  private async waitForVariationReady(): Promise<void> {
    await this.page.locator(productLocators.variation.container).locator(productLocators.variation.readyState).waitFor({ state: "visible" });
  }

  private async goToCartAfterAdd(): Promise<void> {
    await this.successBanner().waitFor({ state: "visible" });
    await this.viewCartLink().click();
  }

  async addSimpleProductToCart(): Promise<void> {
    await this.addToCartButton().click();
  }

  async addVariableProductToCart( options: Record<string, string>): Promise<void> {

    for (const [attribute, value] of Object.entries(options)) {
      await this.page.locator(productLocators.variation.select(attribute)).selectOption({ value });
    }

    await this.waitForVariationReady();
    await this.addToCartButton().click();
  }

  async addGroupedProductToCart( quantities: Record<string, number>): Promise<void> {

    for (const [productName, quantity] of Object.entries(quantities)) {
      await this.groupedQuantityInput(productName).waitFor({ state: "visible" });
      await this.groupedQuantityInput(productName).fill(String(quantity));
    }

    await this.addToCartButton().click();
  }

  async configure(product: any): Promise<void> {

    switch (product.type) {

      // Simple products do not have any options to configure, so we can directly add them to the cart
      case "simple":
        await this.viewCartLinkbyProduct(product.name).click(); 
        break;

      // Note: variable and grouped products require additional configuration
      case "variable":
        await this.addVariableProductToCart(product.options);
        await this.goToCartAfterAdd();
        break;

      case "grouped":
        await this.addGroupedProductToCart(product.options);
        await this.goToCartAfterAdd();
        break;
    }
  }
}