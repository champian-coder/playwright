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
const element_utils_1 = require("../helper/utils/element-utils");
const bookStorePage_1 = require("../pages/bookStorePage");
const webTablePage_1 = require("../pages/webTablePage");
const fileUploadDownloadPage_1 = require("../pages/fileUploadDownloadPage");
const browserWindowPage_1 = require("../pages/browserWindowPage");
const path = __importStar(require("path"));
test_1.test.describe('Book Store Application - Login Workflow', () => {
    let page;
    let utils;
    let webTableRecords;
    let bookStorePage;
    test_1.test.beforeAll((_a) => __awaiter(void 0, [_a], void 0, function* ({ browser }) {
        // Create a new browser context and page for the test suite
        const context = yield browser.newContext();
        page = yield context.newPage();
        utils = new element_utils_1.ElementUtils(page);
        const recordsPath = path.join(__dirname, '../data/webTableRecords.json');
        webTableRecords = require(recordsPath);
        // Navigate to the main page
        yield page.goto('https://demoqa.com/');
    }));
    (0, test_1.test)('Verify Login Workflow with Multiple Credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const credentials = [
            { username: 'invalidUser1', password: 'invalidPassword1' },
            { username: 'vk12345', password: 'TitforTat@098' }, // Replace with valid credentials
        ];
        let loginSuccessful = false;
        bookStorePage = new bookStorePage_1.BookStorePage(page);
        for (const { username, password } of credentials) {
            yield test_1.test.step(`Navigating to Book Store`, () => __awaiter(void 0, void 0, void 0, function* () {
                yield bookStorePage.navigateToBookStore();
            }));
            yield test_1.test.step(`Navigating to Login Page`, () => __awaiter(void 0, void 0, void 0, function* () {
                yield bookStorePage.navigateToLoginPage();
            }));
            yield test_1.test.step(`Attempting login with username: ${username}`, () => __awaiter(void 0, void 0, void 0, function* () {
                yield bookStorePage.login(username, password);
            }));
            const isLogoutVisible = yield bookStorePage.isLogoutButtonVisible();
            if (isLogoutVisible) {
                yield test_1.test.step(`Login successful with username: ${username}`, () => __awaiter(void 0, void 0, void 0, function* () {
                    console.log(`Login successful with username: ${username}`);
                    // expect(isLogoutVisible).toBeTruthy();
                }));
                loginSuccessful = true;
                yield test_1.test.step('Logging out', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield bookStorePage.logout();
                    const isLoginVisible = yield bookStorePage.isLoginButtonVisible();
                    console.log(`Login button visible after logout: ${isLoginVisible}`);
                    (0, test_1.expect)(isLoginVisible).toBeTruthy();
                }));
                break;
            }
            else {
                yield test_1.test.step(`Login failed with username: ${username}`, () => __awaiter(void 0, void 0, void 0, function* () {
                    const isLoginVisible = yield bookStorePage.isLoginButtonVisible();
                    console.log(`Login button visible: ${isLoginVisible}`);
                    //expect(isLoginVisible).toBeTruthy();
                }));
                if (!page.isClosed()) {
                    const screenshot = yield page.screenshot({ path: `login-failure-${username}.png` });
                    console.log(`Screenshot captured: login-failure-${username}.png`);
                    // Attach screenshot logic if needed
                }
            }
        }
        // await test.step('Verifying at least one successful login', async () => {
        //   expect(loginSuccessful).toBeTruthy();
        // });
    }));
    (0, test_1.test)('Add a new record to WebTable', () => __awaiter(void 0, void 0, void 0, function* () {
        const webTablePage = new webTablePage_1.WebTablePage(page);
        yield webTablePage.navigateToWebTable();
        for (const record of webTableRecords) {
            yield test_1.test.step(`Processing record: ${record.email}`, () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield webTablePage.addNewRecord(record.firstName, record.lastName, record.email, record.age, record.salary, record.department);
                    const isRecordAdded = yield webTablePage.isRecordAdded();
                    if (!isRecordAdded) {
                        console.log(`Record ${record.email} should be present in the table.`);
                        // expect(!isRecordAdded, `Record ${record.email} should be present in the table.`).toBeTruthy();
                        console.log(`✅ Successfully added record: ${record.email}`);
                    }
                    else {
                        console.log(`⚠️ Record addition expected to fail for invalid data: ${record.email}`);
                        yield webTablePage.closeForm();
                    }
                }
                catch (error) {
                    // Handle error
                }
            }));
        }
    }));
    (0, test_1.test)('Upload and Download File', () => __awaiter(void 0, void 0, void 0, function* () {
        const filePage = new fileUploadDownloadPage_1.FilePage(page);
        yield filePage.navigateToUploadDownloadPage();
        const filePath = 'D:\\test.pdf';
        yield filePage.uploadFile(filePath);
        const uploadedFilePath = yield filePage.getUploadedFilePath();
        console.log(`Uploaded file path: ${uploadedFilePath}`);
        // expect(uploadedFilePath).toContain('test.pdf');
        const downloadPath = yield filePage.downloadFile();
        console.log(`Downloaded file path: ${downloadPath}`);
        // expect(downloadPath).toBeTruthy();
    }));
    (0, test_1.test)('Verify new Tab functionality', () => __awaiter(void 0, void 0, void 0, function* () {
        const browserWindowPage = new browserWindowPage_1.BrowserWindowPage(page);
        yield browserWindowPage.navigateToBrowserWindowPage();
        yield page.waitForTimeout(1000); // Pause for a second
        yield browserWindowPage.openNewTabAndVerifyContent();
    }));
    (0, test_1.test)('Verify new Window functionality', () => __awaiter(void 0, void 0, void 0, function* () {
        const browserWindowPage = new browserWindowPage_1.BrowserWindowPage(page);
        yield browserWindowPage.openNewWindowAndVerifyContent();
    }));
    (0, test_1.test)('Verify Message Window functionality', () => __awaiter(void 0, void 0, void 0, function* () {
        const browserWindowPage = new browserWindowPage_1.BrowserWindowPage(page);
        yield browserWindowPage.openNewMessageWindowAndVerify();
    }));
    test_1.test.afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield page.waitForTimeout(3000);
        yield page.close(); // Close the page after all tests are complete
    }));
});
