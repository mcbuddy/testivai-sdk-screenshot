// Example Puppeteer test using the Testiv.ai SDK
import puppeteer, { Browser, Page } from 'puppeteer';
import { captureScreenshotPuppeteer } from '../src/puppeteer-hook'; // Adjust path if necessary

// Define the path where screenshots will be saved
const screenshotPath = './puppeteer-screenshots';

(async () => {
  let browser: Browser | null = null;
  let page: Page | null = null;
  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.goto('https://example.com'); // Use a simple, reliable site

    // Example: Capture screenshot after navigation
    await captureScreenshotPuppeteer(page, screenshotPath);

    // Example: Perform an action (though example.com has no interactive elements)
    // If testing a different site, you could add clicks, typing, etc. here
    // e.g., await page.click('a');
    // await captureScreenshotPuppeteer(page, screenshotPath);

    console.log('Puppeteer test completed successfully.');

  } catch (error) {
    console.error('Puppeteer test failed:', error);
    // Optionally capture screenshot on error
    if (page) {
      try {
        await captureScreenshotPuppeteer(page, screenshotPath + '/error');
        console.log('Error screenshot captured.');
      } catch (screenshotError) {
        console.error('Failed to capture error screenshot:', screenshotError);
      }
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
