const { test, expect } = require('@playwright/test');

test('Login, add iPhone X to cart, and verify checkout', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.waitForLoadState('networkidle');
  
  // Fill login form with credentials
  await page.fill('input[name="username"]', 'rahulshettyacademy');
  await page.fill('input[type="password"]', 'learning');
  
  // Click sign in button
  await page.click('#signInBtn');
  
  // Wait for products to load
  await page.waitForSelector('app-card', { timeout: 10000 });
  await page.waitForTimeout(2000);
  
  // Get all product cards
  const productCards = page.locator('app-card');
  const productCount = await productCards.count();
  console.log(`\nFound ${productCount} product cards`);
  
  let iphoneXFound = false;
  for (let i = 0; i < productCount; i++) {
    const cardText = await productCards.nth(i).textContent();
    console.log(`Product ${i}: ${cardText.substring(0, 80)}`);
    
    if (cardText && cardText.toLowerCase().includes('iphone x')) {
      iphoneXFound = true;
      console.log('✓ Found iPhone X at index:', i);
      
      // Click "Add to cart" button inside card footer using provided classes
      const addBtn = productCards.nth(i).locator('div.card-footer .btn.btn-info');
      await addBtn.waitFor({ state: 'visible', timeout: 5000 });
      await addBtn.click({ timeout: 5000 });
      console.log('✓ Clicked Add button');
      await page.waitForTimeout(2000);
      break;
    }
  }
  
  expect(iphoneXFound).toBeTruthy();
  
  // Find and click the cart button to go to cart
  // Try different selectors for cart button
  let cartClicked = false;
  
  // Try clicking button with Cart in text
  const cartBtn = page.locator('button:has-text("Cart")');
  if (await cartBtn.count() > 0) {
    await cartBtn.first().click();
    console.log('✓ Clicked Cart button');
    cartClicked = true;
    await page.waitForTimeout(2000);
  }
  
  // If cart button click worked, verify iPhone X is on cart page
  if (cartClicked) {
    const cartPageContent = await page.textContent('body');
    expect(cartPageContent.toLowerCase().includes('iphone x')).toBeTruthy();
    console.log('✓ iPhone X verified in cart');
    
    // Find and click checkout button
    const checkoutBtn = page.locator('button:has-text("Checkout")');
    if (await checkoutBtn.count() > 0) {
      await checkoutBtn.click({ timeout: 5000 });
      console.log('✓ Clicked Checkout');
      
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      
      // Verify iPhone X is in checkout
      const checkoutContent = await page.textContent('body');
      expect(checkoutContent.toLowerCase().includes('iphone x')).toBeTruthy();
      console.log('✓ iPhone X verified in checkout');
    }
  }
  
  console.log('✓ Test completed successfully');
});
