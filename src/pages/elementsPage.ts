import { Page } from '@playwright/test';
import { ElementUtils } from '../helper/utils/element-utils';
import { ElementsLocators } from '../objectRepo/elementsLocators';

export class ElementsPage {
  private page: Page;
  private utils: ElementUtils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new ElementUtils(page);
  }

  async navigateToWebTables() {
    await this.utils.click(this.page.locator(ElementsLocators.elementsButton));
    await this.utils.click(this.page.locator(ElementsLocators.webTablesButton));
  }

  async addNewRecord(firstName: string, lastName: string, email: string, age: string, salary: string, department: string) {
    await this.utils.click(this.page.locator(ElementsLocators.addButton));
    await this.utils.type(this.page.locator(ElementsLocators.firstNameInput), firstName);
    await this.utils.type(this.page.locator(ElementsLocators.lastNameInput), lastName);
    await this.utils.type(this.page.locator(ElementsLocators.emailInput), email);
    await this.utils.type(this.page.locator(ElementsLocators.ageInput), age);
    await this.utils.type(this.page.locator(ElementsLocators.salaryInput), salary);
    await this.utils.type(this.page.locator(ElementsLocators.departmentInput), department);
    await this.utils.click(this.page.locator(ElementsLocators.submitButton));
  }

  async isRecordPresent(email: string): Promise<boolean> {
    const rows = this.page.locator(ElementsLocators.tableRow);
    for (let i = 0; i < await rows.count(); i++) {
      const rowText = await rows.nth(i).textContent();
      if (rowText && rowText.includes(email)) {
        return true;
      }
    }
    return false;
  }
}
