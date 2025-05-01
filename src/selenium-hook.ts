// Selenium specific hook implementation
import { WebDriver } from 'selenium-webdriver';
import fs from 'fs';
import path from 'path'; // Import path module for joining paths

export async function captureScreenshotSelenium(driver: WebDriver, screenshotDir: string) {
  console.log(`Capturing Selenium screenshot. Saving to: ${screenshotDir}`);
  // Ensure the directory exists
  if (!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  const image = await driver.takeScreenshot();
  const screenshotPath = path.join(screenshotDir, `screenshot-${Date.now()}.png`);
  fs.writeFileSync(screenshotPath, image, 'base64');
  console.log(`Screenshot saved to ${screenshotPath}`);
}
