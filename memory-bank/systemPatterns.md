## System Patterns

### System Architecture
The SDK uses a middleware pattern to hook into test runner events and capture screenshots.

### Key Technical Decisions
- Using TypeScript for type safety and maintainability.
- Using Playwright as the primary test runner for initial development.
- Supporting Cypress, Selenium, and Puppeteer for broader compatibility.

### Design Patterns in Use
- Middleware pattern for event hooking.
- Factory pattern for creating screenshot capturers.
- Adapter pattern for integrating with different AI models.

### Component Relationships
- Test Runner -> SDK Middleware -> Event Logger + Screenshot Capturer -> Storage Layer

### Critical Implementation Paths
- Capturing screenshots on test failure.
- Capturing screenshots on specific events (e.g., clicks, hovers).
- Uploading screenshots to a storage layer (local or cloud).
