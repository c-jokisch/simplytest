import { test } from '../shared/fixtures/base.fixture';
import { cartExpect } from "../shared/matchers/cart.matcher";
import { baseExpect } from "../shared/matchers/base.matcher";
import products from "../shared/test-data/products.json";
import shopData from "../shared/test-data/shop.json";

// ============================================================================
// FEATURE: Shopping Cart
// ============================================================================

test.beforeEach(async ({ basePage, page },  testInfo) => {

  // --------------------------------------------------------------------------
  // Background
  // --------------------------------------------------------------------------
    await page.goto(testInfo.project.use.baseURL);

  });

  // --------------------------------------------------------------------------
  // Scenario: Empty cart
  // --------------------------------------------------------------------------

  test.describe("Feature: Shopping Cart", () => {

    test('Check the current state of the shopping page', async ({ cartPage }) => {
      await baseExpect(cartPage).toHaveNavigatedSuccessfully({
            url: shopData.shop.expected.url,
            title: shopData.shop.expected.title,
            h1: shopData.shop.expected.h1,
      });
    }); 

      // scenario validates the system's default state
      test('Empty cart is displayed when no products exist', async ({ cartPage, page }) => {
        await test.step("WHEN the user navigates to the cart page", async () => {
          await page.goto("/cart/");
        });

      await test.step("THEN an empty cart is displayed", async () => {
        await cartExpect(cartPage).toBeEmptyCart();
      });

    });
  
  test.describe("Cart – Add products and validate totals", () => {

    Object.values(products).forEach((product) => {

      test(`${product.name} (${product.type}) → correct cart totals of ${product.expected.expectedTotal} `,
        async ({ shopPage, productPage, cartPage }) => {
          const { name, type, expected } = product;

          await test.step(`GIVEN a ${type} product "${name}" exists in the shop`, async () => {
            await shopPage.productContainer(name).waitFor({ state: "visible" });
          });

          await test.step(`WHEN the user selects and configures "${name}" (${type})`, async () => {
              await shopPage.selectProduct(name, type);
              await productPage.configure(product);
            }
          );

          await test.step("AND the cart is updated according to product configuration",async () => {
              await cartPage.configureCartForProduct(product);
            }
          );

          await test.step(`THEN the cart totals should be ${expected.expectedTotal}`, async () => {
              await cartExpect(cartPage).toBeCartUpdatedProducts(expected);
        });
      });
    });
  });
});


