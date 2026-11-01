import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();

});

  test('Locator Syntax rules', async ({ page }) => {
    // find element by tag name
    page.locator('input');
    // find by ID
    page.locator('#inputEmail1');
    // find by class name
    page.locator('.shape-rectangle');
    //find by attribute name
    page.locator('[placeholder="Email"]');
    // find by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');
    // find by several selectors
    page.locator('input[placeholder="Email"].shape-rectangle');
    page.locator('input[placeholder="Email"][nbinput]');

    // find by Xpath (NOT RECOMMENDED BY PLAYWRIGHT)
    page.locator('//*[@id="inputEmail1"]');

    // find by partial text match
    page.locator(':text("Using")');
    // find by exact text match
    page.locator(':text-is("Using the Grid")');
  });

  test('User visible locators', async ({ page }) => {
    // more about how to use getByRole
    // https://bondaracademy.com/blog/how-to-use-getbyrole-in-playwright
    await page.getByRole('button', { name: 'Sign in'}).first().click();
    await page.getByRole('textbox', { name: 'Email'}).first().fill('test@test.com');

    await page.getByLabel('Email').first().fill('test@test.com');

    await page.getByPlaceholder('Jane Doe').fill('Pavel Smith');

    await page.getByText('Submit').first().click();

    await page.getByTestId('inputEmail1').fill('test@testtesttesttest.com');

    await page.getByTitle('IoT Dashboard').click();
  });

  test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();
    // the same as
    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click();

    // combine user visible locators with css locators
    await page.locator('nb-card').getByRole('button', { name: 'Sign in'}).first().click();

    // not recommended, because if the order of cards changes, the test will fail. Use getByRole instead.
    await page.locator('nb-card').nth(3).getByRole('button').click();
  });

  test('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('button').click();
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('button').click();

    await page.locator('nb-card').filter({ hasText: 'Using the Grid' }).getByRole('button').click();

    await page.locator('nb-card')
      .filter({ has: page.locator('nb-checkbox') })
      .filter({ hasText: 'Sign in' })
      .getByLabel('Email')
      .fill('test@testtest.com');

    // move to the parent element (up the HTML tree).
    await page.getByText('Using the Grid').locator('..').getByRole('button').click();
  });

  test('Reusing locators', async ({ page }) => {
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' });
    const emailInputField = basicForm.getByLabel('Email');

    await emailInputField.fill('test@testtest.com');
    await basicForm.getByLabel('Password').fill('playwright123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button', { name: 'Submit' }).click();

    await expect(emailInputField).toHaveValue('test@testtest.com');
  });

  test('Extracting values', async ({ page }) => {
    // extracting text from the element
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' });
    const submitButtonText = await basicForm.getByRole('button').textContent();
    console.log(submitButtonText);
    expect(submitButtonText).toEqual('Submit');

    // ecxtract multiple text values
    const allRadioButtonValues = await page.locator('nb-radio').allTextContents();
    console.log(allRadioButtonValues);
    expect(allRadioButtonValues).toContain('Option 1');
    expect(allRadioButtonValues).toEqual(['Option 1', 'Option 2', 'Disabled Option']);

    // extract input field values
    const emailField = basicForm.getByRole('textbox', { name: 'Email' });
    await emailField.fill('test@testtest.com');
    const emailFieldValue = await emailField.inputValue();
    console.log(emailFieldValue);
    expect(emailFieldValue).toEqual('test@testtest.com');

    // extract attribute value
    const emailPlaceholder = await emailField.getAttribute('placeholder');
    console.log(emailPlaceholder);
    expect(emailPlaceholder).toEqual('Email');
  });

  test('Assertions', async ({ page}) => {
    const basicFormSectionButton = page.locator('nb-card', { hasText: 'Basic form' }).getByRole('button');

    // regular assertions

    // Generic assertions
    const value = 5;
    expect(value).toEqual(5);

    const submitButtonText = await basicFormSectionButton.textContent();
    expect(submitButtonText).toEqual('Submit');

    // Locator assertion - most stable
    await expect(basicFormSectionButton).toHaveText('Submit');

    // soft assertion
    await expect.soft(basicFormSectionButton).toHaveText('Submit');
    await basicFormSectionButton.click();
  });

  // -----------------------------------------------------------------------------------

  test('has title', async ({ page }) => {
    // https://www.youtube.com/watch?v=e11z1kyLzDM
    await page.goto('https://conduit.bondaracademy.com/');
    const titleLocator = page.locator('.banner h1');

    // generic assertion
    const text = await titleLocator.textContent();
    expect(text).toEqual('conduit');

    // Locator assertion - most stable
    await expect(titleLocator).toHaveText('conduit');


    const listOfArticles = page.locator('app-article-list');
    // const allText = await listOfArticles.textContent();
    // console.log(allText);
    // expect.soft(allText).toContain('Bondar Academy');

    await expect(listOfArticles).toContainText('Bondar Academy');
    //
  });

  // -----------------------------------------------------------------------------------

  test('Generated test', async({ page }) => {
    await page.getByRole('textbox', { name: 'Email address' }).fill('test@testtsts.com');
    // record at cursor from here with bad locators
    await page.locator('#exampleInputPassword1').click();
    await page.locator('#exampleInputPassword1').fill('12345678');
    await page.locator('.form-group > .status-basic > .label > .custom-checkbox').click();
    await page.getByRole('checkbox', { name: 'Check me out' }).check();
    await page.locator('nb-card').filter({ hasText: 'Basic formEmail' }).getByRole('button').click();
  });
