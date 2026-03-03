import { test } from '../shared/fixtures/base.fixture';
import { cartExpect } from "../shared/matchers/cart.matcher";
import { baseExpect, expect } from "../shared/matchers/base.matcher";
import products from "../shared/test-data/products.json";
import shopData from "../shared/test-data/shop.json";


// ============================================================================
// FEATURE: Shopping Cart
// ============================================================================

test.beforeEach(async ({ basePage },  testInfo) => {

  // --------------------------------------------------------------------------
  // Background
  // --------------------------------------------------------------------------
    await basePage.gotoPage(testInfo.project.use.baseURL);
  // Falls du sicher gehen willst:

  });

  // --------------------------------------------------------------------------
  // Scenario: Empty cart
  // --------------------------------------------------------------------------

  test.describe("Feature: Shopping Cart", () => {

    test('Check the current state of the shopping page', async ({ cartPage }) => {

    // GIVEN the cart page
    // WHEN visiting the cart page

    await baseExpect(cartPage).toHaveNavigatedSuccessfully({
          url: shopData.shop.expected.url,
          title: shopData.shop.expected.title,
          h1: shopData.shop.expected.h1,
    });

  }); 

    test('Empty cart is displayed when no products exist', async ({ basePage, cartPage }) => {
      // GIVEN no products in the cart
      // WHEN visiting the cart page
      await basePage.gotoPage("/cart/");
      // THEN an empty cart is displayed
      await cartExpect(cartPage).toBeEmptyCart();
    });

  test.describe("Add different types of items to the cart", () => {

    for (const product of Object.values(products)) {

      test(`Add Item ›${product.name}‹ of type ${product.type} in the cart`,
        async ({ shopPage, cartPage, productPage }) => {
        // GIVEN a product of type ${product.type} exists
        // WHEN adding the product to the cart
          await shopPage.selectProduct(product.name, product.type);
          await productPage.configure(product);
          await cartPage.configureCartForProduct(product);
          
        // THEN the product is added to the cart with correct details
        await cartExpect(cartPage).toBeCartUpdatedProducts(product.expected.path, product.expected.expectedSubtotal, product.expected.expectedTotal, product.expected.expectedOrderTotal); 

        },
       );}
    });
  }); 




