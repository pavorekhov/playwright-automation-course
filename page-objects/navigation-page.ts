import { Page, Locator } from '@playwright/test';
import { step } from '../helpers/test-step-decorator';
import { HelperBase } from './helper-base';

export class NavigationPage extends HelperBase {
  // example how to create locator for first method
  readonly formLayoutsMenu: Locator;

  constructor(page: Page) {
    super(page);
    // example how to create locator for first method
    this.formLayoutsMenu = page.getByText('Form Layouts');
  }

  @step
  async formLayoutsPage() {
    await this.selectGroupMenuItem('Forms');
    // await this.page.waitForTimeout(1000);
    // example how to create locator for first method
    await this.formLayoutsMenu.click();
    const toastMessage = await this.getToastrMessage();
    console.log(toastMessage);
  }

  @step
  async datepickerPage() {
    await this.selectGroupMenuItem('Forms');
    await this.page.getByText('Datepicker').click();
  }

  @step
  async toasterPage() {
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Toastr').click();
  }

  @step
  async tooltipPage() {
    await this.selectGroupMenuItem('Modal & Overlays');
    await this.page.getByText('Tooltip').click();
  }

  @step
  async smartTablePage() {
    await this.selectGroupMenuItem('Tables & Data');
    await this.page.getByText('Smart Table').click();
  }

  private async selectGroupMenuItem(groupMenuTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupMenuTitle);
    const expandedState = await groupMenuItem.getAttribute('aria-expanded');
    if (expandedState === 'false') {
      await groupMenuItem.click();
    }
  }
}
