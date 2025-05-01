"use strict";
/// <reference types="cypress" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCypressScreenshotHook = initCypressScreenshotHook;
// Cypress specific hook implementation
function initCypressScreenshotHook(Cypress, path) {
    console.log(`Initializing Cypress hook. Screenshots will be saved to: ${path}`);
    Cypress.on('command:end', (cmd) => {
        if (cmd.name === 'click') {
            // Ensure cy is available in this scope. Depending on Cypress setup,
            // it might be globally available or need to be passed/imported.
            // Assuming 'cy' is globally available for now as is common in Cypress.
            cy.screenshot(`${path}/screenshot-${Date.now()}`);
        }
    });
}
