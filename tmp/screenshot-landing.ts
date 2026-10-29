// This file is a standalone runner and is not compiled by the app's tsc build.
// It is kept out of src/ so the app's tsconfig does not try to type-check it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { chromium } from "playwright";
import * as fs from "node:fs";
import * as path from "node:path";

(async () => {
  const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
  const page = await browser.newPage({ viewport: { width: 428, height: 900 } });
  await page.goto("https://codebuff-preview-eight-289265594195.us-east-1.aws.codebuff.dev/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  const png = await page.screenshot({ fullPage: false, type: "png" });
  fs.writeFileSync(path.join(process.cwd(), "screenshot-landing.png"), png);
  console.log("ok " + png.length);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
