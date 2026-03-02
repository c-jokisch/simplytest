import { test } from "../shared/fixtures/base.fixture";
import { cartExpect } from "../shared/matchers/cart.matcher";
import products from "../shared/test-data/products.json";

export type TProduct = (typeof products)[keyof typeof products];

// ============================================================================
// FEATURE: Shopping Cart
// ============================================================================

test.beforeEach(async ({ basePage }) => {
  // --------------------------------------------------------------------------
  // Background
  // --------------------------------------------------------------------------
  await basePage.gotoPage("/");
});

// --------------------------------------------------------------------------
// Scenario: Empty cart
// --------------------------------------------------------------------------

test.describe("Feature: Shopping Cart", () => {
  test("Empty cart is displayed when no products exist", async ({
    basePage,
    cartPage,
  }) => {
    // GIVEN no products in the cart
    // WHEN visiting the cart page
    await basePage.gotoPage("/cart/");
    // THEN an empty cart is displayed
    await cartExpect(cartPage).toBeEmptyCart();
  });

  test.describe("Add different types of items to the cart", () => {
    for (const product of Object.values(products)) {
      test(`Add Item ›${product.name}‹ of type ${product.type} in the cart`, async ({
        shopPage,
        cartPage,
        productPage,
      }) => {
        // GIVEN a product of type ${product.type} exists
        // WHEN adding the product to the cart
        await shopPage.selectProduct(product.name, product.type);
        await productPage.configure(product);
        await cartPage.configureCartForProduct(product);

        // THEN the product is added to the cart with correct details
        await cartExpect(cartPage).toBeCartUpdatedProducts(
          product.expected.path,
          product.expected.expectedSubtotal,
          product.expected.expectedTotal,
          product.expected.expectedOrderTotal,
        );
      });
    }
  });
});
