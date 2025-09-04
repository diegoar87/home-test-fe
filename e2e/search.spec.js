import { test, expect } from '@playwright/test';

const searchText = "automation"

test.describe('Search spec test cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('should test search Success', async ({ page }) => {
    await Search(page , searchText)
    const resultText = await page.locator('#result')
    // No need to wait until "Searching..." text disappears. This command will wait and retry automatically until the expected text appears
    await expect(resultText).toHaveText(`Found one result for ${searchText}`);
  });

  test('should test Search Empty', async ({ page }) => {
    await Search(page , "")
    const resultText = await page.locator('#result')
    // No need to wait until "Searching..." text disappears. This command will wait and retry automatically until the expected text appears
    await expect(resultText).toHaveText('Please provide a search word.');
  });
});

async function Search(page, text) {
  await page.fill('input[name="searchWord"]', text);
  await page.click('button[type="submit"]');
}


