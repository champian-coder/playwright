
import { test, expect, Page } from '@playwright/test';
import { ElementUtils } from '../helper/utils/element-utils';
import { BookStorePage } from '../pages/bookStorePage';
import { WebTablePage } from '../pages/webTablePage';
import { FilePage } from '../pages/fileUploadDownloadPage';
import * as path from 'path';

test.describe('Book Store Application - Login Workflow', () => {
  let page: Page;
  let utils: ElementUtils;
  let webTableRecords: Array<{
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;
    isValid: boolean;
  }>;
  let bookStorePage:BookStorePage;
  test.beforeAll(async ({ browser }) => {
    // Create a new browser context and page for the test suite
    const context = await browser.newContext();
    page = await context.newPage();
    utils = new ElementUtils(page);
    const recordsPath = path.join(__dirname, '../data/webTableRecords.json');
        webTableRecords = require(recordsPath);
    // Navigate to the main page
    await page.goto('https://demoqa.com/');
  });

  test('Verify Login Workflow with Multiple Credentials', async () => {
    const credentials = [
      { username: 'invalidUser1', password: 'invalidPassword1' },
      { username: 'validUser1', password: 'validPassword1' }, // Replace with valid credentials
    ];
    let loginSuccessful = false;
    bookStorePage=new BookStorePage(page);
    // for (const { username, password } of credentials) {
    //   //await bookStorePage.navigateToBookStore();
    //   await test.step(`Navigating to Book Store`, async () => {
    //     await bookStorePage.navigateToBookStore();
    //   });
    //   //await bookStorePage.navigateToLoginPage();
    //   await test.step(`Navigating to Login Page`, async () => {
    //     await bookStorePage.navigateToLoginPage();
    //   });
    //   //await bookStorePage.login(username,password);
    //   await test.step(`Attempting login with username: ${username}`, async () => {
    //     await bookStorePage.login(username, password);
    //   });
    //   const isLogoutVisible = await bookStorePage.isLogoutButtonVisible();
    //   if (isLogoutVisible) {
    //     await test.step(`Login successful with username: ${username}`, async () => {
    //       expect(isLogoutVisible).toBeTruthy();
    //     });
  
    //     loginSuccessful = true;
  
    //     await test.step('Logging out', async () => {
    //       await bookStorePage.logout();
    //       const isLoginVisible = await bookStorePage.isLoginButtonVisible();
    //       expect(isLoginVisible).toBeTruthy();
    //     });
  
    //     break;
    //   } else {
    //     await test.step(`Login failed with username: ${username}`, async () => {
    //       const isLoginVisible = await bookStorePage.isLoginButtonVisible();
    //       expect(isLoginVisible).toBeTruthy();
    //     });
  
    //     if (!page.isClosed()) {
    //       const screenshot = await page.screenshot();
    //       // Attach screenshot logic
    //     }
    //   }
    // }
    // await test.step('Verifying at least one successful login', async () => {
    //   expect(loginSuccessful).toBeTruthy();
    // });
  });
    //   test('Add and Verify Records from JSON File', async () => {
    //   const elementsPage = new ElementsPage(page);

    //   // Navigate to the Web Tables section
    //   await elementsPage.navigateToWebTables();

    //   for (const record of webTableRecords) {
    //     test.step(`Processing record: ${record.email}`, async () => {
    //       console.log(`Adding record: ${JSON.stringify(record)}`);
    //       try {
    //         // Add a new record
    //         await elementsPage.addNewRecord(
    //           record.firstName,
    //           record.lastName,
    //           record.email,
    //           record.age,
    //           record.salary,
    //           record.department
    //         );

    //         if (record.isValid) {
    //           const isPresent = await elementsPage.isRecordPresent(record.email);
    //           expect(isPresent, `Record ${record.email} should be present in the table.`).toBeTruthy();
    //           console.log(`✅ Successfully added record: ${record.email}`);
    //         } else {
    //           console.log(`⚠️ Record addition expected to fail for invalid data: ${record.email}`);
    //         }
    //       } catch (error) {
    //         if (!record.isValid) {
    //           console.log(`Handled expected failure for invalid record: ${record.email}`);
    //         } else {
    //           console.error(`❌ Unexpected error for valid record: ${record.email}`, error);
    //           throw error;
    //         }
    //       }
    //     });
    //   }
    // });
  test('Add a new record to WebTable', async () => {
    const webTablePage = new WebTablePage(page);
    await webTablePage.navigateToWebTable();


    //await webTablePage.addNewRecord('John', 'Doe', 'johndoe@example.com', '30', '50000', 'Engineering');
  // for (const record of webTableRecords) {
  //       await test.step(`Processing record: ${record.email}`, async () => {
  //         //console.log(`Adding record: ${JSON.stringify(record)}`);
  //         try {
  //           // Add a new record
  //           await webTablePage.addNewRecord(
  //             record.firstName,
  //             record.lastName,
  //             record.email,
  //             record.age,
  //             record.salary,
  //             record.department
  //           );
  //           const isRecordAdded = await webTablePage.isRecordAdded();
  //           if (!isRecordAdded) {
  //             //const isPresent = await webTablePage.isRecordAdded(record.email);
  //             expect(!isRecordAdded, `Record ${record.email} should be present in the table.`).toBeTruthy();
  //             console.log(`✅ Successfully added record: ${record.email}`);
  //           } else {
  //             console.log(`⚠️ Record addition expected to fail for invalid data: ${record.email}`);
  //             await webTablePage.closeForm();
  //           }
  //         } catch (error) {
  //           // if (!record.isValid) {
  //           //   console.log(`Handled expected failure for invalid record: ${record.email}`);
  //           // } else {
  //           //   console.error(`❌ Unexpected error for valid record: ${record.email}`, error);
  //           //   throw error;
  //           // }
  //         }
  //       });
  //     }
  });
  test('Upload and Download File', async () => {
    const filePage = new FilePage(page);
    await filePage.navigateToUploadDownloadPage();
  
    const filePath = 'D:\\test.pdf';
  
    // Upload File
    await filePage.uploadFile(filePath);
    const uploadedFilePath = await filePage.getUploadedFilePath();
    expect(uploadedFilePath).toContain('test.pdf');
  
    // Download File
    const downloadPath = await filePage.downloadFile();
    expect(downloadPath).toBeTruthy();
  });
  test.afterAll(async () => {
    await page.close(); // Close the page after all tests are complete
  });
});
// import { test, expect } from '@playwright/test';
// import { WebTablePage } from '../pages/webTablePage';

// test.describe('Web Table Tests', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://demoqa.com/');
//   });

//   test('Add a new record to WebTable', async ({ page }) => {
//     const webTablePage = new WebTablePage(page);
//     await webTablePage.navigateToWebTable();

//     //await expect(page.locator('text=Web Tables')).toBeVisible();

//     await webTablePage.addNewRecord('John', 'Doe', 'johndoe@example.com', '30', '50000', 'Engineering');

//     // await webTablePage.searchRecord('johndoe@example.com');
//     // await expect(page.locator('text=johndoe@example.com')).toBeVisible();
//   });

//   // test('Edit the first record in WebTable', async ({ page }) => {
//   //   const webTablePage = new WebTablePage(page);
//   //   await webTablePage.navigateToWebTable();

//   //   await webTablePage.editFirstRecord('Marketing');

//   //   await webTablePage.searchRecord('Marketing');
//   //   await expect(page.locator('text=Marketing')).toBeVisible();
//   // });

//   // test('Delete the first record in WebTable', async ({ page }) => {
//   //   const webTablePage = new WebTablePage(page);
//   //   await webTablePage.navigateToWebTable();

//   //   const initialRowCount = await webTablePage.getRowCount();
//   //   await webTablePage.deleteFirstRecord();

//   //   const finalRowCount = await webTablePage.getRowCount();
//   //   expect(finalRowCount).toBeLessThan(initialRowCount);
//   // });
// });
