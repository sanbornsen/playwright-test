// @ts-check
const { test, expect } = require('@playwright/test');


test('check popup link', async ({ page }) => {
  await page.goto('http://127.0.0.1:8081/');
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('[data-testid="button"]')]);
  
  let timeout = 0;
  while (!popup.url().includes('http') && timeout < 10) {
    // Wait for the PDF to load into the popup window
    // eslint-disable-next-line no-await-in-loop
    await popup.waitForTimeout(1000);
    timeout++;
  }

  // Log out the URI to the PDF
  // eslint-disable-next-line no-console
  console.log(popup.url());
  expect(popup.url()).toBe('https://www.faa.gov/sites/faa.gov/files/regulations_policies/policy_guidance/envir_policy/airquality_handbook/Air_Quality_Handbook_Tutorial.pdf')
});
