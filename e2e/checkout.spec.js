import { test, expect } from '@playwright/test';

test.describe('Checkout spec test cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkout');
  });

test('should Checkout Form Order Success' , async ({page}) => {
    
  });

test('should Checkout Form Alert' , async ({page}) => {
    
  });

});