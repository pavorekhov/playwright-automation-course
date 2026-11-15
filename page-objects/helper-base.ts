import { Page } from '@playwright/test';

export class HelperBase {

  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async getToastrMessage() {
    // this method validates toastr and gets its message
    return 'I am cool toastr!';
  }

}
