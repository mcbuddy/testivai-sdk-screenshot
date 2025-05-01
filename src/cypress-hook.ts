/// <reference types="cypress" />

// Cypress specific hook implementation
export function initCypressScreenshotHook(Cypress: any, path: string) {
  console.log(`Initializing Cypress hook. Screenshots will be saved to: ${path}`);
  Cypress.on('command:end', (cmd: any) => {
    if (cmd.name === 'click') {
      // Ensure cy is available in this scope. Depending on Cypress setup,
      // it might be globally available or need to be passed/imported.
      // Assuming 'cy' is globally available for now as is common in Cypress.
      cy.screenshot(`${path}/screenshot-${Date.now()}`);
    }
  });
}
