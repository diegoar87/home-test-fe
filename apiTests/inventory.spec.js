import { test, expect } from '@playwright/test';

test.describe('Inventory API tests', () => {

 const testItem = {
    id: '10',
    name: 'Hawaiian',
    image: 'hawaiian.png',
    price: '$14'
  };

  /* I see that in server.js there isn't a Delete endpoint. If there existed a good solution would have been to delete item with id = 10
  before starting the api testing  
  
  test.beforeAll(async ({ request }) => {
     Delete item with id = 10 if exists, before starting the tests
    await request.delete(`inventory/delete?id=${testItem.id}`);
  });
*/
  test('should Get all menu items', async ({ request}) => {
    const response = await request.get('inventory');
    expect(response.status()).toBe(200);

    const body = await response.json();
    const data = body.data;

    expect(data.length).toBeGreaterThanOrEqual(9);

    data.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('price');
      expect(item).toHaveProperty('image');
    });
  });

  test('should filter by Id properly', async ({ request}) => {
    const response = await request.get('inventory/filter?id=3');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBe('3');
    expect(data.name).toBe('Baked Rolls x 8');
    expect(data.image).toBe('roll.png');
    expect(data.price).toBe('$10');
  });
    
  test('should add for non existent id', async ({ request }) => {
    const response = await request.post('inventory/add', {
      data: {
        testItem
      }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(testItem.id);
    expect(body.name).toBe(testItem.name);
  });   

  test('should add for existent id and validate error 400', async ({ request }) => {
    const response = await request.post('inventory/add', {
      data: {
       testItem
      }
    });
    expect(response.status()).toBe(400);

  }); 

  test('should try to add item with missing information and validate errors', async ({ request }) => {
    const response = await request.post('inventory/add', {
      data: {
        name: testItem.name, image: testItem.image, price: testItem.price
      }
    });
    expect(response.status()).toBe(400);
    
    const text = await response.text();
    expect(text).toContain('Not all requirements are met');
  }); 

  test('should test added item exists', async ({ request }) => {
    const response = await request.get(`inventory/filter?id=${testItem.id}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.id).toBe(testItem.id);
    expect(data.name).toBe(testItem.name);
    expect(data.image).toBe(testItem.image);
    expect(data.price).toBe(testItem.price);
  }); 

});
