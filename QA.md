# SecureJS Lab quality assurance

## Automated verification

npm run check, npm run coverage, npm run build, npm run audit, and npm run test:e2e.

The CI workflow runs browser tests using actual Chromium, captures desktop and mobile screenshots, and uploads traces/screenshots as GitHub Actions artifacts. Axe-core audits WCAG 2.0/2.1 A/AA serious and critical findings. The workflow also validates and builds the local Docker Compose images.

Covered end-to-end: Array utilities, input validation, prototype-pollution protection, DOM XSS-safe text rendering, role/ownership decisions, safe logging and HTTP handling, visual code comparison.

### Local containers

Run docker compose up --build. Visit http://127.0.0.1:8083.

### Browser regression command

npm run test:e2e

### Review before merge

- Confirm the latest GitHub Actions run is green, including browser tests, accessibility and Compose build.
- Review the Playwright HTML report and saved desktop/mobile screenshots for clipping and contrast.
- Test keyboard navigation and screen-reader announcements manually. Automated axe does not replace human accessibility testing.
- Exercise invalid inputs, role boundaries, duplicate records, capacity races, stale sessions, and network errors.
- Check the work from a clean clone and verify no tokens, real attendee data or payment cards are committed.
- Run a qualified security assessment before considering any production deployment.

## Boundaries and known limitations

Security snippets are training demonstrations, not production endpoints or security certification. No real authentication backend. Original ES6 source folders preserved.

**Status:** An actively developed review-branch portfolio demonstration, not production certified. Automated checks are evidence of specific tested behaviors only, not proof of comprehensive security or browser compatibility.
