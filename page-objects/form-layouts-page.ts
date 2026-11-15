import { Page, Locator } from '@playwright/test';
import { step } from '../helpers/test-step-decorator';
import { HelperBase } from './helper-base';

export class FormLayoutsPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  @step
  async submitUsingTheGridForm(email: string, password: string, optionText: string) {
    const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid'});
    await usingTheGridForm.getByRole('textbox', { name: 'Email'}).fill(email);
    await usingTheGridForm.getByRole('textbox', { name: 'Password'}).fill(password);
    await usingTheGridForm.getByLabel(optionText).check({ force: true });
    await usingTheGridForm.getByRole('button', { name: 'Sign in'}).click();
  }

  /**
   * This method submits the inline form with user full name, email and remember me checkbox can be selected
   * @param fulllName - Valid test user full name (First and Last name)
   * @param email - Valid test user email
   * @param rememberMeCheckBox - Pass 'true' to select Remember Me checkbox, 'false' to leave it unchecked
   */
  @step
  async submitInlineForm(fulllName: string, email: string, rememberMeCheckBox: boolean) {
    const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form'});
    await inlineForm.getByRole('textbox', { name: 'Jane Doe'}).fill(fulllName);
    await inlineForm.getByRole('textbox', { name: 'Email'}).fill(email);
    if (rememberMeCheckBox) {
      await inlineForm.getByRole('checkbox').check({ force: true });
    }
    await inlineForm.getByRole('button', { name: 'Submit'}).click();
  }

}
