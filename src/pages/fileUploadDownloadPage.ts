import { Page } from '@playwright/test';
import { FileLocators } from '../objectRepo/elementsLocators';
import { ElementUtils } from '../helper/utils/element-utils';

export class FilePage {
  readonly page: Page;
  private utils: ElementUtils;

  constructor(page: Page) {
    this.page = page;
    this.utils = new ElementUtils(page);
  }

  async navigateToUploadDownloadPage() {
    //await this.utils.click(this.page.locator(FileLocators.elementsButton));
    await this.utils.click(this.page.locator(FileLocators.uploadAndDownloadMenu));
  }

  async uploadFile(filePath: string) {
    console.log('Uploading a file...');
    await this.page.setInputFiles(FileLocators.uploadButton, filePath);
  }

  async getUploadedFilePath(): Promise<string> {
    console.log('Fetching uploaded file path...');
    return await this.utils.getText(this.page.locator(FileLocators.uploadedFilePath));
  }

  async downloadFile() {
    console.log('Downloading a file...');
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.utils.click(this.page.locator(FileLocators.downloadButton))
    ]);
    const downloadPath = await download.path();
    console.log(`File downloaded to: ${downloadPath}`);
    return downloadPath;
  }
}
