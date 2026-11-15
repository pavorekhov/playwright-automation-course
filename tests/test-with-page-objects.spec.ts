import { test } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
});

test('Navigate to form layouts page', async ({ page }) => {
  const pom = new PageManager(page);
  await pom.navigateTo.formLayoutsPage();
  await pom.navigateTo.datepickerPage();
  await pom.navigateTo.toasterPage();
  await pom.navigateTo.tooltipPage();
  await pom.navigateTo.smartTablePage();
});

test('Parametrized page object methods', async({ page }) => {
  const pom = new PageManager(page);

  await pom.navigateTo.formLayoutsPage();
  await pom.formLayoutsPage.submitUsingTheGridForm('pavel@test.com', 'testtest', 'Option 2');
  await pom.formLayoutsPage.submitInlineForm('Pavel Test', 'pavel@test.com', true);

  await pom.navigateTo.datepickerPage();
  await pom.datepickerPage.selectCommonDatepickerDateFromToday(140);
  await pom.datepickerPage.selectDatePickerWithRangeFromToday(2, 10);
});
