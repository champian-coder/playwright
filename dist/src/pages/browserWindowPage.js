"use strict";
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
exports.BrowserWindowPage = void 0;
const element_utils_1 = require("../helper/utils/element-utils");
const alertsFrameWindowsLocators_1 = require("../objectRepo/alertsFrameWindowsLocators");
class BrowserWindowPage {
    constructor(page) {
        this.page = page;
        this.utils = new element_utils_1.ElementUtils(page);
    }
    navigateToBrowserWindowPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.WindowLoctor.alertsFrameWindowsMenu));
                yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.WindowLoctor.browserWindowsMenu));
            }
            catch (error) {
                console.error('Error navigating to browser window page:', error);
            }
        });
    }
    clickNewTabButton() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.WindowLoctor.newTabButton));
            }
            catch (error) {
                console.error('Error clicking new tab button:', error);
            }
        });
    }
    openNewTabAndVerifyContent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const initialPages = yield this.page.context().pages();
                yield Promise.all([
                    this.page.waitForEvent('popup'),
                    this.clickNewTabButton()
                ]);
                const newPages = yield this.page.context().pages();
                const newPage = newPages.find(p => !initialPages.includes(p));
                if (!newPage)
                    throw new Error('New tab did not open');
                yield newPage.waitForLoadState();
                const content = yield newPage.textContent('body');
                console.log('New tab content:', content);
                if (!content || !content.includes('This is a sample page')) {
                    throw new Error('Content does not match expected text');
                }
                yield newPage.close();
            }
            catch (error) {
                console.error('Error opening new tab and verifying content:', error);
            }
        });
    }
    clicknewWindowButton() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.WindowLoctor.newWindowButton));
            }
            catch (error) {
                console.error('Error clicking new window button:', error);
            }
        });
    }
    openNewWindowAndVerifyContent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const initialPages = yield this.page.context().pages();
                yield this.clicknewWindowButton();
                yield this.page.waitForTimeout(3000); // Allow time for the new window to open
                const newPages = yield this.page.context().pages();
                const newWindow = newPages.find(p => !initialPages.includes(p));
                if (!newWindow)
                    throw new Error('New window did not open');
                yield newWindow.waitForLoadState();
                const content = yield newWindow.textContent('body');
                console.log('New window content:', content);
                if (!content || !content.includes('This is a sample page')) {
                    throw new Error('Content does not match expected text');
                }
                yield newWindow.close();
            }
            catch (error) {
                console.error('Error opening new window and verifying content:', error);
            }
        });
    }
    waitForNewWindow(initialPages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPages = yield this.page.context().pages();
                const newWindow = newPages.find(p => !initialPages.includes(p));
                if (!newWindow)
                    throw new Error('New window did not open');
                yield newWindow.waitForLoadState();
                return newWindow;
            }
            catch (error) {
                console.error('Error waiting for new window:', error);
                throw error;
            }
        });
    }
    verifyNewWindowContent(newWindow, expectedContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield newWindow.textContent('body');
                console.log('New window content:', content);
                if (!content || !content.includes(expectedContent)) {
                    throw new Error('Content does not match expected text');
                }
            }
            catch (error) {
                console.error('Error verifying new window content:', error);
                throw error;
            }
        });
    }
    openNewWindowAndVerify() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const initialPages = yield this.page.context().pages();
                yield this.clicknewWindowButton();
                yield this.page.waitForTimeout(3000); // Allow time for the new window to open
                const newWindow = yield this.waitForNewWindow(initialPages);
                yield this.verifyNewWindowContent(newWindow, 'This is a sample page');
                yield newWindow.close();
            }
            catch (error) {
                console.error('Error opening new window and verifying:', error);
            }
        });
    }
    clickNewMessageButton() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessageButton = this.page.locator(alertsFrameWindowsLocators_1.WindowLoctor.messageWindowButton);
                yield newMessageButton.click();
            }
            catch (error) {
                console.error('Error clicking new message button:', error);
            }
        });
    }
    waitForNewMessageWindow(initialPages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.waitForTimeout(3000); // Allow time for the new window to open
                const newPages = yield this.page.context().pages();
                const newMessageWindow = newPages.find(p => !initialPages.includes(p));
                if (!newMessageWindow)
                    throw new Error('New message window did not open');
                yield newMessageWindow.waitForLoadState('load', { timeout: 45000 });
                return newMessageWindow;
            }
            catch (error) {
                console.error('Error waiting for new message window:', error);
                throw error;
            }
        });
    }
    verifyMessageWindowContent(newMessageWindow, expectedContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield newMessageWindow.evaluate(() => document.body.textContent);
                console.log('New message window content:', content);
                if (!content || !content.includes(expectedContent)) {
                    throw new Error('Content does not match expected text');
                }
            }
            catch (error) {
                console.error('Error verifying message window content:', error);
                throw error;
            }
        });
    }
    openNewMessageWindowAndVerify() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const initialPages = yield this.page.context().pages();
                yield this.clickNewMessageButton();
                const newMessageWindow = yield this.waitForNewMessageWindow(initialPages);
                yield this.verifyMessageWindowContent(newMessageWindow, 'Knowledge increases by sharing but not by saving.');
                yield newMessageWindow.close();
            }
            catch (error) {
                console.error('Error opening new message window and verifying:', error);
            }
        });
    }
}
exports.BrowserWindowPage = BrowserWindowPage;
