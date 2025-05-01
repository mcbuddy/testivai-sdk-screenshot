// Example Cypress test using the Testiv.ai SDK
import { initCypressScreenshotHook } from '../src/cypress-hook'; // Adjust path if necessary

// Define the path where screenshots will be saved
const screenshotPath = './cypress-screenshots';

// Initialize the Testiv.ai hook before tests run
// Note: In a real Cypress project, this initialization is often done
// in the support file (e.g., cypress/support/e2e.js)
// Passing 'Cypress' which is globally available in Cypress test files.
initCypressScreenshotHook(Cypress, screenshotPath);

describe('My First Test with Testiv.ai SDK', () => {
  it('Visits the Kitchen Sink and clicks', () => {
    cy.visit('https://example.cypress.io');
    // This click should trigger the screenshot hook
    cy.contains('type').click();

    // Add an assertion to make it a valid test
    cy.url().should('include', '/commands/actions');
  });
});
