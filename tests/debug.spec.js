const { test } = require('@playwright/test');

test('Debug - explore page after adding to cart', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.waitForLoadState('networkidle');
  
  // Login
  await page.fill('input[name="username"]', 'rahulshettyacademy');
  await page.fill('input[type="password"]', 'learning');
  await page.click('#signInBtn');
  
  await page.waitForSelector('app-card', { timeout: 10000 });
  await page.waitForTimeout(2000);
  
  // Add iPhone X
  const cards = page.locator('app-card');
  for (let i = 0; i < await cards.count(); i++) {
    const text = await cards.nth(i).textContent();
    if (text.toLowerCase().includes('iphone x')) {
      await cards.nth(i).locator('button:has-text("Add")').click();
      console.log('✓ Added iPhone X');
      await page.waitForTimeout(2000);
      break;
    }
  }
  
  // Explore all clickable elements
  console.log('\n=== ALL BUTTONS ===');
  const buttons = await page.locator('button').allTextContents();
  buttons.forEach((btn, idx) => console.log(`  ${idx}: "${btn}"`));
  
  console.log('\n=== ALL LINKS ===');
  const links = await page.locator('a').allTextContents();
  links.slice(0, 15).forEach((link, idx) => console.log(`  ${idx}: "${link}"`));
  
  console.log('\n=== ALL ROUTERLINKS ===');
  const routerlinks = await page.locator('[routerlink]').allTextContents();
  routerlinks.forEach((link, idx) => console.log(`  ${idx}: "${link}"`));
  
  // Get all routerlink attributes
  console.log('\n=== ROUTERLINK ATTRIBUTES ===');
  const routerlinkAttrs = await page.locator('[routerlink]').all();
  for (let i = 0; i < Math.min(routerlinkAttrs.length, 10); i++) {
    const attr = await routerlinkAttrs[i].getAttribute('routerlink');
    const text = await routerlinkAttrs[i].textContent();
    console.log(`  ${i}: routerlink="${attr}" text="${text}"`);
  }
});



