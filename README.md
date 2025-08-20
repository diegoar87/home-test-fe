# Playwright Test Execution Guide

This guide provides an overview of how to run Playwright tests, configure browsers, and execute tests via the command line.

## Running Playwright Tests

To run Playwright tests, use the following command:

```sh
npx playwright test
```

This will execute all tests found in the `tests/` directory by default.

### Running in Headless or Headed Mode

By default, Playwright runs tests in headless mode. To run tests in headed mode, use:

```sh
npx playwright test --headed
```

Alternatively, to explicitly specify headless mode, use:

```sh
npx playwright test --headless
```

### Selecting a Specific Browser

Playwright supports multiple browsers, including Chromium, Firefox, and WebKit. You can specify which browser to use with:

```sh
npx playwright test --browser=chromium
npx playwright test --browser=firefox
npx playwright test --browser=webkit
```

### Running a Single Test File

To run a specific test file, use:

```sh
npx playwright test path/to/test.spec.ts
```

### Running tests by tags
To run specific tests by using a tag:

- Add the tag on the title of the test. For instance

on e2e/findCourse.spec.js

Test: ('Search by genre @regression')

- Then, run the tests

```sh
npx playwright test --grep @regression
```

### Running Tests with Different Configurations

Playwright allows configuration via the `playwright.config.ts` file. You can specify different projects and run them with:

```sh
npx playwright test --config=playwright.config.ts
```

To execute tests for a specific project defined in the configuration:

```sh
npx playwright test --project=chromium
```

### Running Tests in Parallel or Serially

By default, Playwright runs tests in parallel. To run tests serially, use:

```sh
npx playwright test --workers=1
```

### Debugging and Tracing

For debugging, use the following commands:

- Run tests in debug mode:

  ```sh
  npx playwright test --debug
  ```

- Capture trace files for debugging:

  ```sh
  npx playwright test --trace=on
  ```

- View recorded traces:

  ```sh
  npx playwright show-trace trace.zip
  ```

### Running Tests with the Playwright UI

Playwright provides a UI mode for better test visualization and debugging. To launch the UI, use:

```sh
npx playwright test --ui
```

This opens an interactive UI where you can explore test results, re-run specific tests, and analyze failures.

## Conclusion

This guide outlines how to execute Playwright tests efficiently. Adjust browser settings, execution modes, and debugging options to fit your needs.
