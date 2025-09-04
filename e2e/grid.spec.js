import { test, expect } from '@playwright/test';

const expectedProductName = "Super Pepperoni"

test.describe('Grid spec test cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/grid');
  });

test('should test an individual Grid item' , async ({page}) => {
    const items = page.locator('.container #menu .item')
    const description = await getItemDescriptionByPosition(items, 7)

    await expect(description).toBe(expectedProductName)

});

test('should test all items have a non empty title, price, image and a button' , async ({page}) => {
  const items = page.locator('.container #menu .item')
  const count = await items.count()

  for (let i = 0; i < count; i++) {
    const item = items.nth(i)

    // title
    const title = await item.locator('[data-test-id="item-name"]').innerText()
    expect(title).not.toBe('')

    // price
    const price = await item.locator('#item-price').innerText()
    expect(price).not.toBe('')

    // image
    const imageSrc = await item.locator('img').getAttribute('src')
    expect(imageSrc).toBeDefined()

    // button
    const button = item.locator('[data-test-id="add-to-order"]')
    await expect(button).toBeVisible()
  }
 
});



});

async function getItemDescriptionByPosition(items , index){
    const item =  items.nth(index - 1)
    return item.locator('[data-test-id="item-name"]').innerText()
     
}

