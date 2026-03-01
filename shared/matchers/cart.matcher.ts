import { expect as baseExpect } from "@playwright/test";
import cartData from "../test-data/cart.json";
import { CartPage } from "../pages/cart.page";

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

  async toBeCartUpdatedProducts(cartPage: CartPage, expectedPath: string, expectedSubtotal: string, expectedTotal: string, expectedOrderTotal: string) {
    const errors: string[] = [];

    try {
      await baseExpect(cartPage.pageInstance).toHaveURL(expectedPath);
    } catch {
      errors.push(`Expected URL to contain "${expectedPath}".`);
    }

    try {
      await baseExpect(cartPage.pageInstance.getByRole("alert")).toHaveText(/Cart updated\./i);
    } catch {
      errors.push("Cart updated message not displayed.");
    }

    try {
      await baseExpect(cartPage.cartTotalsSubtotal).toHaveText(expectedSubtotal);
    } catch  {
      errors.push(`Cart subtotal is not "${expectedSubtotal}".`);
    }

    try {
      await baseExpect(cartPage.cartOrderTotal).toHaveText(expectedOrderTotal);
    } catch  {
      errors.push(`Cart order total is not "${expectedOrderTotal}".`);
    } 

    try {
      await baseExpect(cartPage.cartHeaderTotal).toHaveText(expectedTotal);
    } catch  {
      errors.push(`Cart total is not "${expectedTotal}".`);
    }

    const pass = errors.length === 0;

    return {
      pass,
      message: () => (pass ? "Expected cart not to be updated." : errors.join("\n"))
    };
  },


});