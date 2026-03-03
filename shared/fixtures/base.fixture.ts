import { BasePage } from "../pages/base.page";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { ProductPage } from "../pages/product.page";
import { CheckoutPage } from "../pages/checkout.page";
import { test as base } from "@playwright/test";

type Product = {
  name: string;
  type: string;
  quantity: number;
  price: string;
};

type Fixtures = {
  basePage: BasePage;
  shopPage: ShopPage;
  cartPage: CartPage;
  productPage: ProductPage;
  checkoutPage: CheckoutPage;
  checkoutReady:  CheckoutPage;
  productsToAdd: Product[] | Record<string, Product>;
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

  // option fixture
  productsToAdd: [[], { option: true }],

  checkoutReady: async ( { basePage, shopPage, productPage, cartPage, checkoutPage, productsToAdd, page }, use ) => {
    
    const normalizedProducts: Product[] = Array.isArray(productsToAdd)
      ? productsToAdd
      : Object.values(productsToAdd ?? {});

    for (const product of normalizedProducts) {
      await page.goto("/");
      await shopPage.selectProduct(product.name, product.type);
      await productPage.configure(product);
      await cartPage.configureCartForProduct(product);
    }
    await page.goto("/checkout/");
    await checkoutPage.waitUntilLoaded();

     await use(checkoutPage);
  },

});