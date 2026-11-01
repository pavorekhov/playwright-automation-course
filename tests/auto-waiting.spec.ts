import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('https://playground.bondaracademy.com/');
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Dialog').click();
  // testInfo.setTimeout(testInfo.timeout + 3000);
});

test('Auto waiting', async ({ page }) => {
  const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
  await dialogWithDelayForm.getByRole('button', { name: 'Open with delay 3 seconds' }).click();

  const dialogContainer = page.locator('nb-dialog-container');
  const dialogHeaderText = await dialogContainer.locator('nb-card-header').textContent();
  expect(dialogHeaderText).toEqual('Friendly reminder');
  await dialogContainer.getByRole('button', { name: 'OK' }).click();
});

test('Alternative waits', async ({ page }) => {
  const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
  await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
  const dialogContainer = page.locator('nb-dialog-container');

  // option 1: wait for element
  // await dialogContainer.waitFor();
  // or
  // await page.waitForSelector('nb-dialog-container');

  // option 2: wait for API response
  // await page.waitForResponse('**/api/delay/*');

  // option 3: wait for load state (NOT RECOMMENDED)
  // await page.waitForLoadState('networkidle');

  // option 4: hardcoded wait (NEVER EVER USE IT. JUST NEVER)
  // await page.waitForTimeout(3500);

  // const dialogHeaderText = await dialogContainer.locator('nb-card-header').allTextContents();
  // expect(dialogHeaderText).toContain('Friendly reminder');

  // best approach
  await expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder');
});

test('Timeouts', async ({ page }) => {
  // only this test will be with 2 min timeout
  // test.setTimeout(120000);
  // or
  // it increase test timeout in 3 times
  test.slow();
  const dialogWithDelayForm = page.locator('nb-card', { hasText: 'Open Dialog With Delay' });
  await dialogWithDelayForm.getByRole('button', { name: '3 seconds' }).click();
  const dialogContainer = page.locator('nb-dialog-container');
  await expect(dialogContainer.locator('nb-card-header')).toHaveText('Friendly reminder', { timeout: 8000 });

  await dialogContainer.getByRole('button', { name: 'OK' }).click({ timeout: 4000 });
});
