# Testiv.ai SDK MVP: Screenshot SDK for Test Runners (TypeScript)

## Purpose
Create a TypeScript-based SDK that captures screenshots during test execution using Playwright. This tool will serve as the first step toward building a SaaS platform for test analysis and feedback, branded as **Testiv.ai**.

---

## Goals
- Capture screenshots when test events occur (e.g., clicks, failures).
- Easy integration into existing Playwright, Cypress, Selenium, and Puppeteer test projects.
- Future extensibility for video recording or multimodal analysis.
- Open-source with potential for paid SaaS service under the domain [testiv.ai](https://testiv.ai).
- Agnostic to both AI models (OpenAI, Ollama, Together.ai) and testing frameworks (Playwright, Selenium, etc.).

---

## Architecture Overview

```mermaid
graph TD
    A[Test Runner (Playwright/Cypress/Selenium/Puppeteer)] --> B[SDK Middleware (Event Hooker)]
    B --> C[Event Logger + Screenshot Capturer]
    C --> D[Storage Layer (Local or Cloud)]
    D --> E[Optional Reporting Tool (Future)]
    E --> F[AI Model Router Layer]
    F -->|API| G(OpenAI / Gemini)
    F -->|Local| H(Ollama)
    F -->|Self-hosted| I(HuggingFace Transformers)
    F -->|API| J(Together.ai / Groq)
```

---

## Basic File Structure

```bash
testivai-sdk-screenshot/
├── src/
│   ├── index.ts
│   ├── hooks.ts
│   ├── cypress-hook.ts
│   ├── selenium-hook.ts
│   ├── puppeteer-hook.ts
│   ├── utils.ts
│   └── model-router.ts
├── examples/
│   ├── test.spec.ts
│   ├── cypress.spec.ts
│   ├── selenium.test.ts
│   └── puppeteer.test.ts
├── tests/
│   └── hooks.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## New Hook Integrations

### `src/cypress-hook.ts`
```ts
export function initCypressScreenshotHook(Cypress: any, path: string) {
  Cypress.on('command:end', (cmd: any) => {
    if (cmd.name === 'click') {
      cy.screenshot(`${path}/screenshot-${Date.now()}`);
    }
  });
}
```

### `src/selenium-hook.ts`
```ts
import { WebDriver } from 'selenium-webdriver';
import fs from 'fs';

export async function captureScreenshotSelenium(driver: WebDriver, path: string) {
  const image = await driver.takeScreenshot();
  fs.writeFileSync(`${path}/screenshot-${Date.now()}.png`, image, 'base64');
}
```

### `src/puppeteer-hook.ts`
```ts
import { Page } from 'puppeteer';
import fs from 'fs';

export async function captureScreenshotPuppeteer(page: Page, path: string) {
  await page.screenshot({ path: `${path}/screenshot-${Date.now()}.png` });
}
```

---

## MVP Timeline

| Week | Goals |
|------|-------|
| Week 1 | Setup repo, base TypeScript SDK, Playwright example integration |
| Week 2 | Add CLI for SDK config, support more event types (hover, navigation), Cypress and Puppeteer integration |
| Week 3 | Add Selenium support, model adapter layer for AI suggestions (OpenAI, Ollama, Together.ai) |
| Week 4 | Polish docs, add S3/Supabase upload support, prepare NPM publish |

---
