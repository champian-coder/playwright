import { Page } from '@playwright/test';
import { ElementUtils } from '../helper/utils/element-utils';
import { BookStoreLocators } from '../objectRepo/bookStoreLocators';

export class BookStorePage {
  private page: Page;
  private utils: ElementUtils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new ElementUtils(page);
  }

  async navigateToBookStore() {
    await this.utils.waitAndClick(this.page.locator(BookStoreLocators.bookStoreAppButton));
  }

  async navigateToLoginPage() {
    await this.utils.waitAndClick(this.page.locator(BookStoreLocators.loginButton));
  }

  async login(username: string, password: string) {
    await this.utils.waitAndType(this.page.locator(BookStoreLocators.usernameInput), username);
    await this.utils.waitAndType(this.page.locator(BookStoreLocators.passwordInput), password);
    await this.utils.waitAndClick(this.page.locator(BookStoreLocators.loginSubmitButton));
  }

  async isLogoutButtonVisible(): Promise<boolean> {
    return this.page.locator(BookStoreLocators.logoutButton).isVisible();
  }

  async logout() {
    await this.utils.waitAndClick(this.page.locator(BookStoreLocators.logoutButton));
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return this.page.locator(BookStoreLocators.loginButton).isVisible();
  }
}
