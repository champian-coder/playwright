"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const bookStorePage_1 = require("../pages/bookStorePage");
const path = __importStar(require("path"));
test_1.test.describe('Book Store and Web Table Tests', () => {
    let browser;
    let context;
    let page;
    let bookStorePage;
    let credentials;
    let webTableRecords;
    // Load JSON files and set up browser context before running tests
    test_1.test.beforeAll((_a) => __awaiter(void 0, [_a], void 0, function* ({ browser: playwrightBrowser }) {
        browser = playwrightBrowser;
        context = yield browser.newContext();
        page = yield context.newPage();
        bookStorePage = new bookStorePage_1.BookStorePage(page);
        const credentialsPath = path.join(__dirname, '../data/credentials.json');
        const recordsPath = path.join(__dirname, '../data/webTableRecords.json');
        credentials = require(credentialsPath);
        webTableRecords = require(recordsPath);
        yield page.goto('https://demoqa.com/');
        // Navigate to the Book Store Application
    }));
    // Close browser context after all tests
    test_1.test.afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield context.close();
    }));
    // Test Suite for Login Scenarios
    test_1.test.describe('Login Scenarios', () => {
        (0, test_1.test)('Verify Login for Multiple Credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            yield bookStorePage.navigateToBookStore();
            for (const { username, password } of credentials) {
                test_1.test.step(`Testing login for username: ${username}`, () => __awaiter(void 0, void 0, void 0, function* () {
                    yield bookStorePage.navigateToLogin();
                    // Perform login
                    yield bookStorePage.login(username, password);
                    const isLoginSuccessful = yield bookStorePage.isLoginSuccessful();
                    console.log(`Login result for ${username}: ${isLoginSuccessful ? 'SUCCESS' : 'FAILURE'}`);
                    // Assert login outcome
                    (0, test_1.expect)(isLoginSuccessful, `Login for user ${username} should be successful.`).toBeTruthy();
                    // Log out for valid logins
                    if (isLoginSuccessful) {
                        yield bookStorePage.logout();
                    }
                }));
            }
        }));
    });
    // Uncomment and modify the Web Table Operations suite if needed
    // test.describe('Web Table Operations', () => {
    //   test('Add and Verify Records from JSON File', async () => {
    //     const elementsPage = new ElementsPage(page);
    //     // Navigate to the Web Tables section
    //     await elementsPage.navigateToWebTables();
    //     for (const record of webTableRecords) {
    //       test.step(`Processing record: ${record.email}`, async () => {
    //         console.log(`Adding record: ${JSON.stringify(record)}`);
    //         try {
    //           // Add a new record
    //           await elementsPage.addNewRecord(
    //             record.firstName,
    //             record.lastName,
    //             record.email,
    //             record.age,
    //             record.salary,
    //             record.department
    //           );
    //           if (record.isValid) {
    //             const isPresent = await elementsPage.isRecordPresent(record.email);
    //             expect(isPresent, `Record ${record.email} should be present in the table.`).toBeTruthy();
    //             console.log(`✅ Successfully added record: ${record.email}`);
    //           } else {
    //             console.log(`⚠️ Record addition expected to fail for invalid data: ${record.email}`);
    //           }
    //         } catch (error) {
    //           if (!record.isValid) {
    //             console.log(`Handled expected failure for invalid record: ${record.email}`);
    //           } else {
    //             console.error(`❌ Unexpected error for valid record: ${record.email}`, error);
    //             throw error;
    //           }
    //         }
    //       });
    //     }
    //   });
    // });
});
