import { Page } from '@playwright/test';
import { ElementUtils } from '../helper/utils/element-utils';
import { AlertLocators } from '../objectRepo/alertsFrameWindowsLocators';

export class AlertsPage {
  readonly page: Page;
  private utils: ElementUtils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new ElementUtils(page);
  }
  async navigateToAlertsPage() {
    await this.utils.waitAndClick(this.page.locator(AlertLocators.alertsFrameWindowsMenu));
    await this.utils.waitAndClick(this.page.locator(AlertLocators.alertsMenu));
  }
  async clickAlertButton() {
    await this.utils.waitAndClick(this.page.locator(AlertLocators.alertButton));
  }

  async clickConfirmButton() {
    await this.utils.waitAndClick(this.page.locator(AlertLocators.confirmButton));
  }

  async clickPromptButton() {
    await this.utils.waitAndClick(this.page.locator(AlertLocators.promptButton));
  }

  async acceptAlert() {
    await this.utils.acceptAlert();
  }

  async dismissAlert() {
    await this.utils.dismissAlert();
  }

  async getAlertMessage() {
    return await this.utils.getAlertText();
  }

  async enterTextInPromptAlert(text: string) {
    await this.utils.enterAlertText(text);
  }
}
