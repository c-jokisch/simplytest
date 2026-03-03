import { expect } from '@playwright/test';
import { test  } from '../shared/fixtures/base.fixture';
import shopData from "../shared/test-data/shop.json";
import checkoutData from "../shared/test-data/checkout.json";

test.describe("Feature: Checkout Process", () => {
    test.use({ productsToAdd: shopData.products });

    test("complete checkout process with correct user data", async ({ checkoutReady }) => {

        await checkoutReady.fillBillingDetails( checkoutData.checkout.validUser );

        await checkoutReady.selectBankTransfer();
        await checkoutReady.placeOrder();

        await checkoutReady.expectOrderSuccess();
    });

    test("should show error if first name is missing", async ({ checkoutReady }) => {
        await checkoutReady.fillBillingDetails( checkoutData.checkout.invalidUser );
        await checkoutReady.placeOrder();
    });

        test("should show error if mail is invalid", async ({ checkoutReady }) => {
        await checkoutReady.fillBillingDetails( checkoutData.checkout.invalidUserMail );
        await checkoutReady.placeOrder();
    });

});