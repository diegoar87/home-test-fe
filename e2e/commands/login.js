export async function Login(page, username, password) {
    await page.locator("#username").fill(username)
    await page.locator("#password").fill(password)
    await page.getByRole("button" , {name : "SIGN IN"}).click()
}
