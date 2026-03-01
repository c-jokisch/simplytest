import { test } from "../shared/fixtures/base.fixture";
import navData from "../shared/test-data/navigation.json";
import { expect as baseExpect } from "../shared/matchers/base.matcher";

test.describe("Feature: Navigation", ( ) => {

  for (const page of navData.pages) {

    test(
      `Navigates to "${page.label}" page successfully`,
      async ({ shopPage, basePage }, testInfo) => {

        // GIVEN the webshop homepage
        await shopPage.gotoPage(testInfo.project.use.baseURL);

        // WHEN the user navigates to the page
        await basePage.gotoPage(page.path);

        // THEN the correct URL, title and headline are displayed
        await baseExpect(shopPage).toHaveNavigatedSuccessfully({
          url: page.path,
          title: page.title,
          h1: page.h1,
        });
      }
    );

  }

});