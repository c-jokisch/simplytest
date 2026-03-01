import { expect as baseExpect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";

export const expect = baseExpect.extend({
  async toHaveNavigatedSuccessfully(
    shopPage: ShopPage,
    expected: { url: string; title: string; h1: string }
  ) {
    const results: string[] = [];

    try {
      await baseExpect(shopPage.pageInstance).toHaveURL(expected.url);
    } catch {
      results.push(`URL did not match: ${expected.url}`);
    }

    try {
      await baseExpect(shopPage.pageInstance).toHaveTitle(expected.title);
    } catch {
      results.push(`Title did not match: ${expected.title}`);
    }

    try {
      await baseExpect(shopPage.pageInstance.getByRole('heading', { level: 1 })).toHaveText(expected.h1);
    } catch {
      results.push(`H1 did not match: ${expected.h1}`);
    }

    return {
      pass: results.length === 0,
      message: () => `Navigation results: ${results.join(", ")}`,
    };
  },
});