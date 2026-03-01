import { Page, Locator } from "@playwright/test";
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

  private productContainer(productName: string): Locator {
    return this.page.locator(shopLocators.product.container).filter({ has: this.page.getByRole("heading", { name: productName })});
  }

  private addToCartButton(productName: string): Locator {
    return this.productContainer(productName).getByRole("link", { name: shopLocators.product.buttons.addToCart });
  }

  private viewCartLink(productName: string): Locator {
    return this.productContainer(productName).getByRole("link", { name: shopLocators.product.buttons.viewCart });
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

  // check if the product has been added to the cart by waiting for the "added" state to be applied
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
  async actionButton( productName: string, type: string): Promise<void> {

  switch (type) {

    case "simple": {
      await this.addToCartButton(productName).click();
      await this.waitForProductNotLoading(this.addToCartButton(productName));
      await this.waitForProductAdded(this.addToCartButton(productName));
      await this.viewCartLink(productName).waitFor({ state: "visible" });
      await this.viewCartLink(productName).click();
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

  async selectProduct( productName: string, type: string ): Promise<void> {
    await this.actionButton(productName, type);
  }
}