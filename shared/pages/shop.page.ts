import { Page, Locator, expect } from "@playwright/test";
import { shopLocators } from "../locators/shop.locators";
import { BasePage } from "./base.page";

export class ShopPage extends BasePage {

  // ============================================================================
  // CONSTRUCTOR
  // ============================================================================

  constructor(page: Page) {
    super( page );
  }

  // ============================================================================
  // LOCATORS
  // ============================================================================

  public productContainer(productName: string): Locator {
    // Note: Hoodie or Hoodie with Logo thus, exact: true added
    return this.page.locator(shopLocators.product.container).filter({ has: this.page.getByRole("heading", { name: productName, exact: true })});
  }

  private addToCartButton(productName: string): Locator {
    return this.productContainer(productName).getByRole("link", { name: shopLocators.product.buttons.addToCart });
  }

  private addVariableProductButton(productName: string): Locator {
    return this.productContainer(productName).getByRole("link", { name: shopLocators.product.buttons.selectOptions });
  }

  private addGroupedProductButton(productName: string): Locator {
    return this.productContainer(productName).getByRole("link", { name: shopLocators.product.buttons.viewProducts });
  }

  // ============================================================================
  // ACTIONS
  // ============================================================================

private async waitForProductNotLoading(product: Locator) {
  const handle = await product.elementHandle();
  // Check if the product has a handle and wait for the loading state to be removed
  if (handle) {
    await this.page.waitForFunction(
      ({ el, className }) => !el.classList.contains(className),
      {
        el: handle,
        className: shopLocators.product.states.loading,
      }
    );
  }
}

private async waitForProductAdded(product: Locator) {
  const handle = await product.elementHandle();
  // check if the product has been added to the cart by waiting for the added state to be applied
  if (handle) {
    await this.page.waitForFunction(
      ({ el, className }) => el.classList.contains(className),
      {
        el: handle,
        className: shopLocators.product.states.added,
      }
    );
  }
}

  // To simplify no product type defined 
  async selectProduct( productName: string, type: string): Promise<void> {

  switch (type) {
      case "simple": {
        await this.addToCartButton(productName).click();

        // both approaches work reliably

        // Approach 1
        // includes auto-retry and pulls the DOM state
        // wait for the specific state being fullfilled 

        //await expect(this.addToCartButton(productName)).not.toHaveClass(new RegExp(shopLocators.product.states.loading));
        //await expect(this.addToCartButton(productName)).toHaveClass(new RegExp(shopLocators.product.states.added)); 

        // Approach 2
        // Instead of using Playwright expect(), we explicitly wait
        // for DOM state transitions triggered
        // 1. Wait until the "loading" CSS class is removed
        await this.waitForProductNotLoading(this.addToCartButton(productName));
        // 1. Wait until the "loading" CSS class is removed 
        await this.waitForProductAdded(this.addToCartButton(productName));

        break;
      }

      case "variable": {
        await this.addVariableProductButton(productName).click();
        break;
      }

      case "grouped": {
        await this.addGroupedProductButton(productName).click();
        break;
      }
    }
  }
}