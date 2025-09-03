# Playwright Test Execution Guide

This guide provides an overview of how to run Playwright tests, configure browsers, and execute tests via the command line.

---

## Configuring Docker Mode

In the root directory, open `config.js` and set the value of `DOCKER` in the `Config` object:

```js
const Config = {
  DOCKER: 0 // set to 1 if you want to run tests in Docker
};
```

* `DOCKER: 0` → run tests locally
* `DOCKER: 1` → run tests inside a Docker container

This setting controls the `baseURL` used in the tests.

---

## NPM Scripts

The `package.json` includes convenient scripts to run tests locally or in Docker:

```json
"scripts": {
  "test:e2e-local": "npx playwright test",
  "test:api-local": "npx playwright test --project=api",
  "test:e2e-docker": "docker run --rm -it --add-host=host.docker.internal:host-gateway -v $(pwd):/home/pwuser/app -w /home/pwuser/app --user pwuser mcr.microsoft.com/playwright:v1.55.0-noble npx playwright test",
  "test:api-docker": "docker run --rm -it --add-host=host.docker.internal:host-gateway -v $(pwd):/home/pwuser/app -w /home/pwuser/app --user pwuser mcr.microsoft.com/playwright:v1.55.0-noble npx playwright test --project=api"
}
```

* **Local E2E tests:**

  ```sh
  npm run test:e2e-local
  ```
* **Local API tests:**

  ```sh
  npm run test:api-local
  ```
* **Docker E2E tests:**

  ```sh
  npm run test:e2e-docker
  ```
* **Docker API tests:**

  ```sh
  npm run test:api-docker
  ```

---

## Running Playwright Tests Commands

To run Playwright tests manually, use:

```sh
npx playwright test
```

This executes all tests in the `tests/` directory by default.

---

### Running in Headless or Headed Mode

* Headed mode (shows browser UI):

  ```sh
  npx playwright test --headed
  ```
* Headless mode (default):

  ```sh
  npx playwright test --headless
  ```

---

### Selecting a Specific Browser

```sh
npx playwright test --browser=chromium
npx playwright test --browser=firefox
npx playwright test --browser=webkit
```

---

### Running a Single Test File

```sh
npx playwright test path/to/test.spec.ts
```

---

### Running Tests by Tags

* Add a tag to the test title:

```ts
test('should successfully login @regression', async () => { ... });
```

* Run tests matching the tag:

```sh
npx playwright test --grep @regression
```

---

### Running Tests with Different Configurations

Playwright uses `playwright.config.ts` to define projects:

```sh
npx playwright test --config=playwright.config.ts
npx playwright test --project=api
```

---

### Running Tests in Parallel or Serially

* Parallel (default): runs multiple tests at once
* Serial:

  ```sh
  npx playwright test --workers=1
  ```

---

### Debugging and Tracing

* Debug mode:

  ```sh
  npx playwright test --debug
  ```
* Capture traces:

  ```sh
  npx playwright test --trace=on
  ```
* View trace files:

  ```sh
  npx playwright show-trace trace.zip
  ```

---

### Playwright UI

Interactive UI for exploring test results:

```sh
npx playwright test --ui
```

---

## Best Practices

1. Use `Config.DOCKER` to switch between local and Docker environments.
2. For API tests, consider using dynamic IDs instead of fixed ones to avoid conflicts.
3. Use `--workers=1` for tests that depend on sequential execution.
4. Include headers like `Accept: application/json` when calling your API endpoints.
5. If your API does not support deletion, rely on unique IDs for each test run.

---

## Conclusion

Set the `DOCKER` value in `config.js` according to your environment, then use the corresponding npm scripts to run tests locally or in Docker. Adjust browsers, execution modes, and debugging options as needed for your workflow.
