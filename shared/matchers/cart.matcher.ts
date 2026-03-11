import { expect as baseExpect } from "@playwright/test";
import cartData from "../test-data/cart.json";
import { CartPage } from "../pages/cart.page";
import { cartLocators } from "../locators/cart.locators";

type CartExpectation = {
  path: string;
  expectedSubtotal: string;
  expectedTotal: string;
  expectedOrderTotal: string;
};


export const cartExpect = baseExpect.extend({
  async toBeEmptyCart(cartPage: CartPage) {

    const errors: string[] = [];

    // Check if the empty cart message is displayed
    try {
      await baseExpect(cartPage.cartEmptyMessage).toHaveText(cartData.cart.messages.empty);
    } catch {
      errors.push("Empty cart message not found");
    }

    // Check if the cart total shows "0,00 €"
    try {
      await baseExpect(cartPage.cartHeaderTotal).toHaveText(cartData.cart.header.totalEmptyMoney);
    } catch {
      errors.push(`Display does not contain "${cartData.cart.header.totalEmptyMoney}".`);
    }

    // Check if the cart badge shows "0 items"
    try {
      await baseExpect(cartPage.cartBadge).toHaveText(cartData.cart.header.badgeZero);
    } catch {
      errors.push(`Cart badge is not "${cartData.cart.header.badgeZero}".`);
    }

    const pass = errors.length === 0;

    return {
      pass,
      message: () => (pass ? "Expected cart not to be empty." : errors.join("\n"))
    };
  },

  async toBeCartUpdatedProducts(cartPage: CartPage, expected: CartExpectation) {
    const errors: string[] = [];

    try {
      await baseExpect(cartPage.pageInstance).toHaveURL(expected.path);
    } catch {
      errors.push(`Expected URL to contain "${expected.path}".`);
    }

    try {
      await baseExpect(cartPage.pageInstance.getByRole("alert")).toHaveText(cartLocators.successMessageName);
    } catch {
      errors.push("Cart updated message not displayed.");
    }

    try {
      await baseExpect(cartPage.cartTotalsSubtotal).toHaveText(expected.expectedSubtotal);
    } catch  {
      errors.push(`Cart subtotal is not "${expected.expectedSubtotal}".`);
    }

    try {
      await baseExpect(cartPage.cartOrderTotal).toHaveText(expected.expectedOrderTotal);
    } catch  {
      errors.push(`Cart order total is not "${expected.expectedOrderTotal}".`);
    } 

    try {
      await baseExpect(cartPage.cartHeaderTotal).toHaveText(expected.expectedTotal);
    } catch  {
      errors.push(`Cart total is not "${expected.expectedTotal}".`);
    }

    const pass = errors.length === 0;

    return {
      pass,
      message: () => (pass ? "Expected cart not to be updated." : errors.join("\n"))
    };
  },


});