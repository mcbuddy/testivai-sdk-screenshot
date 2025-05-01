// Puppeteer specific hook implementation
import { Page } from 'puppeteer';
import fs from 'fs';
import path from 'path'; // Import path module for joining paths

export async function captureScreenshotPuppeteer(page: Page, screenshotDir: string) {
  console.log(`Capturing Puppeteer screenshot. Saving to: ${screenshotDir}`);
  // Ensure the directory exists
  if (!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  const screenshotPath = path.join(screenshotDir, `screenshot-${Date.now()}.png`);
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to ${screenshotPath}`);
}
