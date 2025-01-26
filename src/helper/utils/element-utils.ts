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
      console.log(`Clicked on locator: ${locator.toString()}`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to click on locator: ${locator.toString()}`);
      throw error;
    }
  }

  async type(locator: Locator, text: string, timeout = 10000, delay = this.defaultDelay) {
    try {
      await locator.waitFor({ state: 'attached', timeout }); // Changed to 'attached'
      await locator.fill(text);
      console.log(`Typed "${text}" into locator: ${locator.toString()}`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to type into locator: ${locator.toString()}`);
      throw error;
    }
  }

  async waitForElement(locator: Locator, state: 'visible' | 'hidden' | 'attached' | 'detached', timeout = 10000, delay = 0) {
    try {
      await locator.waitFor({ state, timeout });
      console.log(`Element ${locator.toString()} is ${state}`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${locator.toString()} to be ${state}`);
      throw error;
    }
  }

  async waitForVisibility(locator: Locator, timeout = 10000, delay = 0) {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      console.log(`Element ${locator.toString()} is visible`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${locator.toString()} to be visible`);
      throw error;
    }
  }

  async waitForInvisibility(locator: Locator, timeout = 10000, delay = 0) {
    try {
      await locator.waitFor({ state: 'hidden', timeout });
      console.log(`Element ${locator.toString()} is hidden`);
      if (delay > 0) await this.pause(delay);
    } catch (error) {
      console.error(`Failed to wait for locator: ${locator.toString()} to be hidden`);
      throw error;
    }
  }

  async waitAndClick(locator: Locator, timeout = 10000, delay = this.defaultDelay) {
    try {
      await this.waitForVisibility(locator, timeout);
      await this.click(locator, timeout, delay);
    } catch (error) {
      console.error(`Failed to wait and click on locator: ${locator.toString()}`);
      throw error;
    }
  }

  async waitAndType(locator: Locator, text: string, timeout = 10000, delay = this.defaultDelay) {
    try {
      await this.waitForVisibility(locator, timeout);
      await this.type(locator, text, timeout, delay);
    } catch (error) {
      console.error(`Failed to wait and type into locator: ${locator.toString()}`);
      throw error;
    }
  }
  
  async getText(locator: Locator, timeout = 10000): Promise<string> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return await locator.innerText();
    } catch (error) {
      console.error(`Failed to get text from locator: ${locator.toString()}`);
      throw error;
    }
  }
  
  async isElementVisible(locator: Locator, timeout = 10000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }
  async uploadFile(locator: Locator, filePath: string) {
    try {
      await locator.setInputFiles(filePath);
      console.log(`Uploaded file: ${filePath} to locator: ${locator.toString()}`);
    } catch (error) {
      console.error(`Failed to upload file: ${filePath} to locator: ${locator.toString()}`);
      throw error;
    }
  }

  async downloadFile(downloadButton: Locator, downloadPath: string) {
    try {
      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        downloadButton.click()
      ]);
      const suggestedPath = download.suggestedFilename();
      await download.saveAs(`${downloadPath}/${suggestedPath}`);
      console.log(`File downloaded to: ${downloadPath}/${suggestedPath}`);
    } catch (error) {
      console.error(`Failed to download file to: ${downloadPath}`);
      throw error;
    }
  }

  async acceptAlert( delay = this.defaultDelay) {
    try {
      const alert = await this.page.waitForEvent('dialog');
      if (delay > 0) await this.pause(delay);
      console.log(`Accepting alert with message: ${alert.message()}`);
      await alert.accept();
    } catch (error) {
      console.error('Failed to accept alert');
      throw error;
    }
  }

  async dismissAlert(delay = this.defaultDelay) {
    try {
      const alert = await this.page.waitForEvent('dialog');
      console.log(`Dismissing alert with message: ${alert.message()}`);
      if (delay > 0) await this.pause(delay);
      await alert.dismiss();
    } catch (error) {
      console.error('Failed to dismiss alert');
      throw error;
    }
  }

  async getAlertText(): Promise<string> {
    try {
      const alert = await this.page.waitForEvent('dialog');
      console.log(`Alert message: ${alert.message()}`);
      return alert.message();
    } catch (error) {
      console.error('Failed to get alert text');
      throw error;
    }
  }

  async enterAlertText(text: string) {
    try {
      const alert = await this.page.waitForEvent('dialog');
      console.log(`Entering text "${text}" in prompt alert`);
      await alert.accept(text);
    } catch (error) {
      console.error(`Failed to enter text "${text}" into alert`);
      throw error;
    }
  }

}
