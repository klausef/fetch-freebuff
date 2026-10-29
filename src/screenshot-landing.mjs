import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://codebuff-preview-eight-289265594195.us-east-1.aws.codebuff.dev/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: "/home/daytona/codebase/screenshot-landing.png", fullPage: false });
  console.log("screenshot written");
  await browser.close();
})();
