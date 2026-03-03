import { test } from "../shared/fixtures/base.fixture";
import navData from "../shared/test-data/navigation.json";
import { expect as baseExpect } from "../shared/matchers/base.matcher";

test.describe("Feature: Navigation", ( ) => {

  for (const pagePath of navData.pages) {

    test(
      `Navigates to "${pagePath.label}" page successfully`,
      async ({ shopPage, basePage, page }, testInfo) => {

        // GIVEN the webshop homepage
        await page.goto(testInfo.project.use.baseURL);

        // WHEN the user navigates to the page
        await page.goto(pagePath.path);

        // THEN the correct URL, title and headline are displayed
        await baseExpect(shopPage).toHaveNavigatedSuccessfully({
          url: pagePath.path,
          title: pagePath.title,
          h1: pagePath.h1,
        });
      }
    );

  }

});