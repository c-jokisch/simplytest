import { BasePage } from "../pages/base.page";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { test as base } from "@playwright/test";

/**
 * Domain model for products used in test setup.
*/

type Product = {
  name: string;
  type: string;
  quantity: number;
  price: string;
};

/**
 * Custom fixtures available in tests.
*/

type Fixtures = {
  basePage: BasePage;
  shopPage: ShopPage;
  cartPage: CartPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  productsToAdd: Product[] | Record<string, Product>;

  /**
   * Prepares checkout state with products already added to cart.
  */
  checkoutReady:  CheckoutPage;
};

export const test = base.extend<Fixtures>({

  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },

  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productsToAdd: [[], { option: true }],

  /**
     * checkoutReady fixture
     *
     * Prepares the checkout state by:
     * 1. Navigating to shop
     * 2. Selecting product
     * 3. Configuring product
     * 4. Updating cart
     *
     * This acts as a technical GIVEN for checkout tests.
   */

  checkoutReady: async ( { shopPage, productPage, cartPage, checkoutPage, productsToAdd }, use ) => {
    
    // Normalize productsToAdd to always work with an array
    const normalizedProducts: Product[] = Array.isArray(productsToAdd) ? productsToAdd: Object.values(productsToAdd ?? {});

    for (const product of normalizedProducts) {
      await shopPage.pageInstance.goto("/");
      await shopPage.selectProduct(product.name, product.type);
      await productPage.configure(product);
      await cartPage.configureCartForProduct(product);
    }

     await use(checkoutPage);
  },

});