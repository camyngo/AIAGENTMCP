# AIAGENTMCP — Playwright tests

This repository contains a minimal Playwright Test scaffold to run browser tests.

**Prerequisites**
- Node.js (recommended >= 16) and `npm` installed.

**Setup**
Run these commands from the project root:
```bash
cd AIAGENTMCP
npm install
npx playwright install
```

**Run tests**
- Headless (default):
```bash
npm test
```
- Headed (open real browser windows):
```bash
npm run test:headed
```

**View report**
After a run that generates a report, open it with:
```bash
npm run show-report
```

**Files of interest**
- `playwright.config.js` — Playwright configuration (tests live in `tests/`).
- `tests/example.spec.js` — Example test that visits `https://example.com`.

**Commit & push (optional)**
To add this README to git and push:
```bash
git add README.md
git commit -m "docs: add README with run/test instructions"
git push origin main
```

**CI / Next steps (optional)**
- Add a GitHub Actions workflow to run `npm test` on push/PR.
- Convert to TypeScript or add more tests under `tests/`.

If you want, I can commit and push this file for you now.
