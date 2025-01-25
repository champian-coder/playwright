import { Page } from '@playwright/test';
import { WebTableLocators } from '../objectRepo/elementsLocators';
import { ElementUtils } from '../helper/utils/element-utils';

export class WebTablePage {
  readonly page: Page;
  private utils: ElementUtils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new ElementUtils(page);
  }

  async navigateToWebTable() {
    console.log('Navigating to Web Tables...');
    await this.utils.click(this.page.locator(WebTableLocators.elementsButton));
    await this.utils.click(this.page.locator(WebTableLocators.webTableMenu));
  }

  async addNewRecord(
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    salary: string,
    department: string
  ) {
    console.log('Adding a new record...');
    await this.utils.click(this.page.locator(WebTableLocators.addButton));

    await this.utils.type(this.page.locator(WebTableLocators.firstNameInput), firstName);
    await this.utils.type(this.page.locator(WebTableLocators.lastNameInput), lastName);
    await this.utils.type(this.page.locator(WebTableLocators.emailInput), email);
    await this.utils.type(this.page.locator(WebTableLocators.ageInput), age);
    await this.utils.type(this.page.locator(WebTableLocators.salaryInput), salary);
    await this.utils.type(this.page.locator(WebTableLocators.departmentInput), department);

    await this.utils.click(this.page.locator(WebTableLocators.submitButton));
    
  }

  async isRecordAdded(): Promise<boolean> {
    console.log('Checking if record was successfully added...');
    return await this.utils.isElementVisible(this.page.locator(WebTableLocators.formModel),1000);
  }

  async searchRecord(query: string) {
    console.log(`Searching for record with query: ${query}`);
    await this.utils.type(this.page.locator(WebTableLocators.searchBox), query);
  }
    async closeForm() {
    console.log('Closing the form...');
    await this.utils.click(this.page.locator(WebTableLocators.closeButton));
  }
  async deleteFirstRecord() {
    console.log('Deleting the first record...');
    await this.utils.click(this.page.locator(WebTableLocators.deleteButton).first());
  }

  async editFirstRecord(newDepartment: string) {
    console.log('Editing the first record...');
    await this.utils.click(this.page.locator(WebTableLocators.editButton).first());
    await this.utils.type(this.page.locator(WebTableLocators.departmentInput), newDepartment);
    await this.utils.click(this.page.locator(WebTableLocators.submitButton));
  }

  async getRowCount(): Promise<number> {
    console.log('Getting the number of rows in the table...');
    return await this.page.locator(WebTableLocators.tableRows).count();
  }
}
