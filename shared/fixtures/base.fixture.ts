import { BasePage } from "../pages/base.page";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { ProductPage } from "../pages/product.page";
import { test as base } from "@playwright/test";

type Fixtures = {
  basePage: BasePage
  shopPage: ShopPage;
  cartPage: CartPage;
  productPage: ProductPage;
};

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage( page );
    await use(basePage);
  },
  shopPage: async ({ page }, use) => {
    const shopPage = new ShopPage(page); 
    await use(shopPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page); 
    await use(cartPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page); 
    await use(productPage);
  } 
});

export { expect } from '@playwright/test';