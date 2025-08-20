import { test, expect } from '@playwright/test';
import { Config } from '../config';


test.describe('Login spec test cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

test('should successfully login' , async ({page}) => {
    await page.locator("#username").fill(Config.DEFAULT_USER.username)
    await page.locator("#password").fill(Config.DEFAULT_USER.password)
    await page.getByRole("button" , {name : "SIGN IN"}).click()
    const welcomeLocator = page.locator("#welcome-message")
    await expect(welcomeLocator).toContainText("Welcome!")
    await expect(welcomeLocator).toContainText(Config.DEFAULT_USER.username)
  });

test('should login fail with wrong credentials' , async ({page}) => {
    await page.locator("#username").fill("wrong")
    await page.locator("#password").fill("wrong")
    await page.getByRole("button" , {name : "SIGN IN"}).click()
    const wrongCredentialsLocator = page.getByText("Wrong credentials")
    await expect(wrongCredentialsLocator).toBeVisible();
   
  });

  test('should login with blank spaces' , async ({page}) => {
    await page.locator("#username").fill("")
    await page.locator("#password").fill("")
    await page.getByRole("button" , {name : "SIGN IN"}).click()
    const enterCredentialsLocator = page.getByText("Fields can not be empty")
    await expect(enterCredentialsLocator).toBeVisible();
  });
});