import { checkoutExpect } from "../shared/matchers/checkout.matcher";
import { test  } from '../shared/fixtures/base.fixture';
import shopData from "../shared/test-data/shop.json";
import checkoutData from "../shared/test-data/checkout.json";

test.describe("Feature: Checkout Process", () => {
    test.use({ productsToAdd: shopData.products });

    test("complete checkout process with correct user data", async ({ checkoutReady }) => {

        await test.step("GIVEN the user is on the checkout page", async () => {
            await checkoutReady.pageInstance.goto("/checkout/");
            await checkoutReady.waitUntilLoaded();
        });

        await test.step("WHEN the user enters valid billing details and selects bank transfer", async () => {
            await checkoutReady.fillBillingDetails(checkoutData.checkout.validUser);
            await checkoutReady.selectBankTransfer();
        });

        await test.step("AND places the order", async () => {
            await checkoutReady.placeOrder();
        });

        await test.step("THEN the order should be completed successfully", async () => {
            await checkoutExpect(checkoutReady).toBeOrderSuccessful();
        });
    });

    test("Should show validation error if first name is missing", async ({ checkoutReady }) => {

        await test.step("GIVEN the user is on the checkout page", async () => {
            await checkoutReady.pageInstance.goto("/checkout/");
            await checkoutReady.waitUntilLoaded();
        });

        await test.step("WHEN the user submits the checkout form without a first name", async () => {
            await checkoutReady.fillBillingDetails(checkoutData.checkout.invalidUser);
            await checkoutReady.placeOrder();
        });

        await test.step("THEN the checkout should display a validation error for the missing first name", async () => {
            await checkoutExpect(checkoutReady).toCompleteProcessing();
            await checkoutExpect(checkoutReady)
            .toContainErrors(checkoutData.checkout.invalidUser.expected);
        });
    });

    test("Should show validation error if email address is invalid", async ({ checkoutReady }) => {

        await test.step("GIVEN the user is on the checkout page", async () => {
            await checkoutReady.pageInstance.goto("/checkout/");
            await checkoutReady.waitUntilLoaded();
        });

        await test.step("WHEN the user submits the checkout form with an invalid email address", async () => {
            await checkoutReady.fillBillingDetails(checkoutData.checkout.invalidUserMail);
            await checkoutReady.placeOrder();
        });

        await test.step("THEN the checkout should display a validation error for the invalid email", async () => {
            await checkoutExpect(checkoutReady).toCompleteProcessing();
            await checkoutExpect(checkoutReady)
            .toContainErrors(checkoutData.checkout.invalidUserMail.expected);
        });
    });
});