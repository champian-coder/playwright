import { Page, Locator } from '@playwright/test';

export class ElementUtils {
  private page: Page;
  private defaultDelay: number;

  constructor(page: Page) {
    this.page = page;
    this.defaultDelay = 1000; // Reduced default delay to 1 second for better efficiency
  }

  private async pause(ms: number) {
    console.log(`Pausing for ${ms}ms...`);
    await this.page.waitForTimeout(ms);
  }

  async click(locator: Locator, timeout = 10000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state: 'attached', timeout }); // Changed to 'attached' for faster interaction
      await locator.click();
      console.log(`Clicked on locator: ${locator}`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to click on locator: ${locator}`);
      throw error;
    }
  }

  async type(locator: Locator, text: string, timeout = 10000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state: 'attached', timeout }); // Changed to 'attached'
      await locator.fill(text);
      console.log(`Typed "${text}" into locator: ${locator}`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to type into locator: ${locator}`);
      throw error;
    }
  }

  async waitForElement(locator: Locator, state: 'visible' | 'hidden' | 'attached' | 'detached', timeout = 10000, delay = 0) {
    try {
      await locator.waitFor({ state, timeout });
      console.log(`Element ${locator} is ${state}`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${locator} to be ${state}`);
      throw error;
    }
  }

  async waitForVisibility(locator: Locator, timeout = 10000, delay = 0) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      console.log(`Element ${locator} is visible`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${locator} to be visible`);
      throw error;
    }
  }

  async waitForInvisibility(locator: Locator, timeout = 10000, delay = 0) {
    try {
      await locator.waitFor({ state: 'hidden', timeout });
      console.log(`Element ${locator} is hidden`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${locator} to be hidden`);
      throw error;
    }
  }

  async waitAndClick(locator: Locator, timeout = 10000, delay = this.defaultDelay) {
    try {
      await this.waitForVisibility(locator, timeout);
      await this.click(locator, timeout, delay);
    } catch (error) {
      console.error(`Failed to wait and click on locator: ${locator}`);
      throw error;
    }
  }

  async waitAndType(locator: Locator, text: string, timeout = 10000, delay = this.defaultDelay) {
    try {
      await this.waitForVisibility(locator, timeout);
      await this.type(locator, text, timeout, delay);
    } catch (error) {
      console.error(`Failed to wait and type into locator: ${locator}`);
      throw error;
    }
  }
}
