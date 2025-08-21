import { test, expect } from '@playwright/test';
import { Config } from '../config';
import { Login } from './commands/login';

let username = Config.DEFAULT_USER.username;
let password = Config.DEFAULT_USER.password;

test.describe('Login spec test cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

test('should successfully login @regression' , async ({page}) => {
    await Login(page,username,password)
    const welcomeLocator = page.locator("#welcome-message")
    await expect(welcomeLocator).toContainText("Welcome!")
    await expect(welcomeLocator).toContainText(username)
  });

test('should login fail with wrong credentials' , async ({page}) => {
    await Login(page,"wrong" , "wrong")
    const wrongCredentialsLocator = page.getByText("Wrong credentials")
    await expect(wrongCredentialsLocator).toBeVisible();
  });

  test('should login with blank spaces' , async ({page}) => {
    await Login(page,"", "")
    const enterCredentialsLocator = page.getByText("Fields can not be empty")
    await expect(enterCredentialsLocator).toBeVisible();
  });
});