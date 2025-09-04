import { test, expect } from '@playwright/test';
import { parsePrice } from './utils/utils';


const personData = {
    name: "Diego Rojas",
    cardNumber : "123456789",
    cvv :  "234" , 
    expmonth : "June",
    expyear : "2028" , 
    fname :"Diego",
    email : "diego@rojas.com",
    adr : "Newbery 3900",
    city : "bsas" ,
    zip : "1414",
    state : "bsas"
}

const checkoutBtnLbl = "Continue to checkout"
const alertMessage = "Shipping address same as billing checkbox must be selected."

test.describe('Checkout spec test cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/checkout');
  });

test('should Checkout Form Order Success' , async ({page}) => {
    await fillPersonData(page , personData);
    const checkboxLocator =  page.getByRole("checkbox")
    const isChecked = await checkboxLocator.isChecked();

    if (!isChecked) {
    await checkboxLocator.check(); // Check same address checkbox
    }
    await page.getByText(checkoutBtnLbl).click()

    const orderLocator = page.locator('[data-id="ordernumber"]')
    const orderText = await orderLocator.innerText()
    const numberNotEmpty = await assertOrderNumberNotEmpty(orderText);
    await expect(numberNotEmpty).toBe(true)

  });

test('should Checkout Form Alert' , async ({page}) => {
    await fillPersonData(page , personData);
    const checkboxLocator =  page.getByRole("checkbox")
    const isChecked = await checkboxLocator.isChecked();

    if (isChecked) {
    await checkboxLocator.uncheck(); // Uncheck same address checkbox
    }

   const dialogPromise = page.waitForEvent('dialog')
   await page.getByText(checkoutBtnLbl).click()

   const dialog = await dialogPromise

   expect(dialog.message()).toBe(alertMessage)
   await dialog.accept()
  

   // Instead of assert the popup is not showing, I assert the checkout button is enabled. That means the popup is not showing anymore
   await expect(page.getByText(checkoutBtnLbl)).toBeEnabled()
   
      
});

test('should Cart total be equal to sum of all items' , async ({page}) => {

  const allParagraphs =  page.locator('.row .container p')
  const count = await allParagraphs.count()

  const totalText = await allParagraphs.nth(count - 1).locator('span').innerText();
  const total =  parsePrice(totalText)
  
  let sum = 0
 
  for (let i = 0 ; i < count - 1 ; i++){

    const itemText = await allParagraphs.nth(i).locator('span').innerText()
    
    sum +=  parsePrice(itemText)
  }
   await expect(sum).toBe(total)

});



});

async function assertOrderNumberNotEmpty(order){
    let orderSplit = order.split(":")
  
    if (orderSplit[1] != ""){
        
        return true
    }
    return false
}

async function fillPersonData(page, person) {
    await page.locator("#cname").fill(person.name);
    await page.locator("#ccnum").fill(person.cardNumber);
    await page.locator("#expmonth").selectOption(person.expmonth);
    await page.locator("#cvv").fill(person.cvv);
    await page.locator("#expyear").fill(person.expyear);
    await page.locator("#fname").fill(person.fname);
    await page.locator("#email").fill(person.email);
    await page.locator("#adr").fill(person.adr);
    await page.locator("#city").fill(person.city);
    await page.locator("#zip").fill(person.zip);
    await page.locator("#state").fill(person.state);
}
