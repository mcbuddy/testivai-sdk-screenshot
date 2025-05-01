// Main entry point for the Testiv.ai SDK

// Export hook functions for different test runners
export { initCypressScreenshotHook } from './cypress-hook';
export { captureScreenshotSelenium } from './selenium-hook';
export { captureScreenshotPuppeteer } from './puppeteer-hook';

// Optionally export other utilities or core functions if needed in the future
// export * from './utils';
// export * from './model-router'; // If these become part of the public API

console.log("Testiv.ai SDK entry point loaded. Exporting hooks.");
