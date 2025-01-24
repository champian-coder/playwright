// import { test, expect, Browser, BrowserContext, Page } from '@playwright/test';
// import { BookStorePage } from '../pages/bookStorePage';
// import { ElementsPage } from '../pages/elementsPage';
import * as path from 'path';

// test.describe('Book Store and Web Table Tests', () => {
//   let browser: Browser;
//   let context: BrowserContext;
//   let page: Page;
//   let bookStorePage: BookStorePage;
//   let credentials: Array<{ username: string; password: string }>;
//   let webTableRecords: Array<{
//     firstName: string;
//     lastName: string;
//     email: string;
//     age: string;
//     salary: string;
//     department: string;
//     isValid: boolean;
//   }>;

//   // Load JSON files and set up browser context before running tests
//   test.beforeAll(async ({ browser: playwrightBrowser }) => {
//     browser = playwrightBrowser;
//     context = await browser.newContext();
//     page = await context.newPage();
//     bookStorePage = new BookStorePage(page);

//     const credentialsPath = path.join(__dirname, '../data/credentials.json');
//     const recordsPath = path.join(__dirname, '../data/webTableRecords.json');
//     credentials = require(credentialsPath);
//     webTableRecords = require(recordsPath);
//     await page.goto('https://demoqa.com/');
//     // Navigate to the Book Store Application
//   });

//   // Close browser context after all tests
//   test.afterAll(async () => {
//     await context.close();
//   });

//   // Test Suite for Login Scenarios
//   test.describe('Login Scenarios', () => {
//     test('Verify Login for Multiple Credentials', async () => {
//     await bookStorePage.navigateToBookStore();
//       for (const { username, password } of credentials) {
//         test.step(`Testing login for username: ${username}`, async () => {
//           await bookStorePage.navigateToLogin();

//           // Perform login
//           await bookStorePage.login(username, password);

//           const isLoginSuccessful = await bookStorePage.isLoginSuccessful();
//           console.log(`Login result for ${username}: ${isLoginSuccessful ? 'SUCCESS' : 'FAILURE'}`);

//           // Assert login outcome
//           expect(isLoginSuccessful, `Login for user ${username} should be successful.`).toBeTruthy();

//           // Log out for valid logins
//           if (isLoginSuccessful) {
//             await bookStorePage.logout();
//           }
//         });
//       }
//     });
//   });

//   // Uncomment and modify the Web Table Operations suite if needed
//   // test.describe('Web Table Operations', () => {
//   //   test('Add and Verify Records from JSON File', async () => {
//   //     const elementsPage = new ElementsPage(page);

//   //     // Navigate to the Web Tables section
//   //     await elementsPage.navigateToWebTables();

//   //     for (const record of webTableRecords) {
//   //       test.step(`Processing record: ${record.email}`, async () => {
//   //         console.log(`Adding record: ${JSON.stringify(record)}`);
//   //         try {
//   //           // Add a new record
//   //           await elementsPage.addNewRecord(
//   //             record.firstName,
//   //             record.lastName,
//   //             record.email,
//   //             record.age,
//   //             record.salary,
//   //             record.department
//   //           );

//   //           if (record.isValid) {
//   //             const isPresent = await elementsPage.isRecordPresent(record.email);
//   //             expect(isPresent, `Record ${record.email} should be present in the table.`).toBeTruthy();
//   //             console.log(`✅ Successfully added record: ${record.email}`);
//   //           } else {
//   //             console.log(`⚠️ Record addition expected to fail for invalid data: ${record.email}`);
//   //           }
//   //         } catch (error) {
//   //           if (!record.isValid) {
//   //             console.log(`Handled expected failure for invalid record: ${record.email}`);
//   //           } else {
//   //             console.error(`❌ Unexpected error for valid record: ${record.email}`, error);
//   //             throw error;
//   //           }
//   //         }
//   //       });
//   //     }
//   //   });
//   // });
// });




import { test, expect, Page } from '@playwright/test';
import { ElementUtils } from '../helper/utils/element-utils';
import { BookStoreLocators } from '../objectRepo/bookStoreLocators';
import { ElementsPage } from '../pages/elementsPage';
import { BookStorePage } from '../pages/bookStorePage';
import { allure } from 'allure-playwright';

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
    for (const { username, password } of credentials) {
      //await bookStorePage.navigateToBookStore();
      await test.step(`Navigating to Book Store`, async () => {
        await bookStorePage.navigateToBookStore();
      });
      //await bookStorePage.navigateToLoginPage();
      await test.step(`Navigating to Login Page`, async () => {
        await bookStorePage.navigateToLoginPage();
      });
      //await bookStorePage.login(username,password);
      await test.step(`Attempting login with username: ${username}`, async () => {
        await bookStorePage.login(username, password);
      });
      const isLogoutVisible = await bookStorePage.isLogoutButtonVisible();
      // if (isLogoutVisible) {
      //   console.log(`Login successful with username: ${username}`);
      //   expect(isLogoutVisible).toBeTruthy();
      //   await bookStorePage.logout();
      //   const isLoginVisible = await bookStorePage.isLoginButtonVisible();
      //   expect(isLoginVisible).toBeTruthy();
      //   break; // Exit the loop after successful login
      // } else {
      //   console.log(`Login failed with username: ${username}`);
      //   const isLoginVisible = await bookStorePage.isLoginButtonVisible();
      //   expect(isLoginVisible).toBeTruthy(); // Ensure the login page is still visible
      // }
      if (isLogoutVisible) {
        await test.step(`Login successful with username: ${username}`, async () => {
          expect(isLogoutVisible).toBeTruthy();
        });
  
        loginSuccessful = true;
  
        await test.step('Logging out', async () => {
          await bookStorePage.logout();
          const isLoginVisible = await bookStorePage.isLoginButtonVisible();
          expect(isLoginVisible).toBeTruthy();
        });
  
        break;
      } else {
        await test.step(`Login failed with username: ${username}`, async () => {
          const isLoginVisible = await bookStorePage.isLoginButtonVisible();
          expect(isLoginVisible).toBeTruthy();
        });
  
        if (!page.isClosed()) {
          const screenshot = await page.screenshot();
          // Attach screenshot logic
        }
      }
    }
    // await test.step('Verifying at least one successful login', async () => {
    //   expect(loginSuccessful).toBeTruthy();
    // });
  });
// test.describe('Web Table Operations', () => {
//     test('Add and Verify Records from JSON File', async () => {
//       const elementsPage = new ElementsPage(page);

//       // Navigate to the Web Tables section
//       await elementsPage.navigateToWebTables();

//       for (const record of webTableRecords) {
//         test.step(`Processing record: ${record.email}`, async () => {
//           console.log(`Adding record: ${JSON.stringify(record)}`);
//           try {
//             // Add a new record
//             await elementsPage.addNewRecord(
//               record.firstName,
//               record.lastName,
//               record.email,
//               record.age,
//               record.salary,
//               record.department
//             );

//             if (record.isValid) {
//               const isPresent = await elementsPage.isRecordPresent(record.email);
//               expect(isPresent, `Record ${record.email} should be present in the table.`).toBeTruthy();
//               console.log(`✅ Successfully added record: ${record.email}`);
//             } else {
//               console.log(`⚠️ Record addition expected to fail for invalid data: ${record.email}`);
//             }
//           } catch (error) {
//             if (!record.isValid) {
//               console.log(`Handled expected failure for invalid record: ${record.email}`);
//             } else {
//               console.error(`❌ Unexpected error for valid record: ${record.email}`, error);
//               throw error;
//             }
//           }
//         });
//       }
//     });
//   });
  test.afterAll(async () => {
    await page.close(); // Close the page after all tests are complete
  });
});
