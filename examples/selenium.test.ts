// Example Selenium test using the Testiv.ai SDK
import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { captureScreenshotSelenium } from '../src/selenium-hook'; // Adjust path if necessary

// Define the path where screenshots will be saved
const screenshotPath = './selenium-screenshots';

(async function example() {
  let driver: WebDriver | null = null; // Initialize driver as null
  try {
    // Ensure you have the correct WebDriver executable (e.g., chromedriver) in your PATH
    // or specify its path using selenium-webdriver/chrome options.
    driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://www.google.com/ncr'); // Use a reliable example site

    // Example: Capture screenshot after navigation
    await captureScreenshotSelenium(driver, screenshotPath);

    let element = await driver.findElement(By.name('q'));
    await element.sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 5000); // Increased wait time

    // Example: Capture screenshot after search results load
    await captureScreenshotSelenium(driver, screenshotPath);

    console.log("Selenium test completed successfully.");

  } catch (error) {
    console.error("Selenium test failed:", error);
    // Optionally capture screenshot on error
    if (driver) {
      try {
        await captureScreenshotSelenium(driver, screenshotPath + '/error');
        console.log("Error screenshot captured.");
      } catch (screenshotError) {
        console.error("Failed to capture error screenshot:", screenshotError);
      }
    }
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
})();
