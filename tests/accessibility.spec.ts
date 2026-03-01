import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";
import navData from "../shared/test-data/navigation.json";
import fs from "fs";
import path from "path";

test.describe("Feature: Accessibility", () => {

  for (const nav of navData.pages) {

    test(
      `"${nav.label}" meets WCAG 2A and 2AA standards`,
      async ({ page }) => {

        // GIVEN the homepage
        await page.goto(nav.path);

        // WHEN an accessibility scan is executed
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa"])
          .analyze();

        // AND the results are saved
        const outputDir = path.join("reports", "accessibility");
        fs.mkdirSync(outputDir, { recursive: true });

        const filePath = path.join(
          outputDir,
          "homepage-a11y-results.json"
        );

        fs.writeFileSync(
          filePath,
          JSON.stringify(results, null, 2)
        );

        createHtmlReport({
          results,
          options: {
            outputDir: `reports/accessibility/${nav.label}`,
            reportFileName: `${nav.label}-a11y-report.html`,
          },
        });

        // THEN no accessibility violations exist
        expect(results.violations).toEqual([]);
      }
    );

  }; 

});