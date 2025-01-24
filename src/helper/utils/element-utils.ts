import { Page, Locator } from '@playwright/test';

export class ElementUtils {
  private page: Page;
  private defaultDelay: number;

  constructor(page: Page) {
    this.page = page;
    this.defaultDelay = 1000; // Default delay of 1 second
  }

 
  private async pause(ms: number) {
    console.log(`Pausing for ${ms}ms...`);
    await this.page.waitForTimeout(ms);
  }


  async click(locator: Locator, timeout = 5000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.click();
      console.log(`Clicked on locator: ${await locator.toString()}`);
      await this.pause(delay);
    } catch (error) {
      console.error(`Failed to click on locator: ${await locator.toString()}`);
      throw error;
    }
  }


  async type(locator: Locator, text: string, timeout = 5000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      await locator.fill(text);
      console.log(`Typed "${text}" into locator: ${await locator.toString()}`);
      await this.pause(delay);
    } catch (error) {
      console.error(`Failed to type into locator: ${await locator.toString()}`);
      throw error;
    }
  }


  async waitForElement(locator: Locator, state: 'visible' | 'hidden' | 'attached' | 'detached', timeout = 5000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state, timeout });
      console.log(`Element ${await locator.toString()} is ${state}`);
      await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${await locator.toString()} to be ${state}`);
      throw error;
    }
  }


  async waitForVisibility(locator: Locator, timeout = 5000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      console.log(`Element ${await locator.toString()} is visible`);
      await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${await locator.toString()} to be visible`);
      throw error;
    }
  }

 
  async waitForInvisibility(locator: Locator, timeout = 5000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state: 'hidden', timeout });
      console.log(`Element ${await locator.toString()} is hidden`);
      await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${await locator.toString()} to be hidden`);
      throw error;
    }
  }
}
