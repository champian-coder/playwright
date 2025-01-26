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
exports.ElementUtils = void 0;
class ElementUtils {
    constructor(page) {
        this.page = page;
        this.defaultDelay = 1000; // Reduced default delay to 1 second for better efficiency
    }
    pause(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Pausing for ${ms}ms...`);
            yield this.page.waitForTimeout(ms);
        });
    }
    click(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 10000, delay = this.defaultDelay) {
            try {
                yield locator.waitFor({ state: 'attached', timeout }); // Changed to 'attached' for faster interaction
                yield locator.click();
                console.log(`Clicked on locator: ${locator.toString()}`);
                if (delay > 0)
                    yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to click on locator: ${locator.toString()}`);
                throw error;
            }
        });
    }
    type(locator_1, text_1) {
        return __awaiter(this, arguments, void 0, function* (locator, text, timeout = 10000, delay = this.defaultDelay) {
            try {
                yield locator.waitFor({ state: 'attached', timeout }); // Changed to 'attached'
                yield locator.fill(text);
                console.log(`Typed "${text}" into locator: ${locator.toString()}`);
                if (delay > 0)
                    yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to type into locator: ${locator.toString()}`);
                throw error;
            }
        });
    }
    waitForElement(locator_1, state_1) {
        return __awaiter(this, arguments, void 0, function* (locator, state, timeout = 10000, delay = 0) {
            try {
                yield locator.waitFor({ state, timeout });
                console.log(`Element ${locator.toString()} is ${state}`);
                if (delay > 0)
                    yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to wait for locator: ${locator.toString()} to be ${state}`);
                throw error;
            }
        });
    }
    waitForVisibility(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 10000, delay = 0) {
            try {
                yield locator.waitFor({ state: 'visible', timeout });
                console.log(`Element ${locator.toString()} is visible`);
                if (delay > 0)
                    yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to wait for locator: ${locator.toString()} to be visible`);
                throw error;
            }
        });
    }
    waitForInvisibility(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 10000, delay = 0) {
            try {
                yield locator.waitFor({ state: 'hidden', timeout });
                console.log(`Element ${locator.toString()} is hidden`);
                if (delay > 0)
                    yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to wait for locator: ${locator.toString()} to be hidden`);
                throw error;
            }
        });
    }
    waitAndClick(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 10000, delay = this.defaultDelay) {
            try {
                yield this.waitForVisibility(locator, timeout);
                yield this.click(locator, timeout, delay);
            }
            catch (error) {
                console.error(`Failed to wait and click on locator: ${locator.toString()}`);
                throw error;
            }
        });
    }
    waitAndType(locator_1, text_1) {
        return __awaiter(this, arguments, void 0, function* (locator, text, timeout = 10000, delay = this.defaultDelay) {
            try {
                yield this.waitForVisibility(locator, timeout);
                yield this.type(locator, text, timeout, delay);
            }
            catch (error) {
                console.error(`Failed to wait and type into locator: ${locator.toString()}`);
                throw error;
            }
        });
    }
    getText(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 10000) {
            try {
                yield locator.waitFor({ state: 'visible', timeout });
                return yield locator.innerText();
            }
            catch (error) {
                console.error(`Failed to get text from locator: ${locator.toString()}`);
                throw error;
            }
        });
    }
    isElementVisible(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 10000) {
            try {
                yield locator.waitFor({ state: 'visible', timeout });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    uploadFile(locator, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield locator.setInputFiles(filePath);
                console.log(`Uploaded file: ${filePath} to locator: ${locator.toString()}`);
            }
            catch (error) {
                console.error(`Failed to upload file: ${filePath} to locator: ${locator.toString()}`);
                throw error;
            }
        });
    }
    downloadFile(downloadButton, downloadPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [download] = yield Promise.all([
                    this.page.waitForEvent('download'),
                    downloadButton.click()
                ]);
                const suggestedPath = download.suggestedFilename();
                yield download.saveAs(`${downloadPath}/${suggestedPath}`);
                console.log(`File downloaded to: ${downloadPath}/${suggestedPath}`);
            }
            catch (error) {
                console.error(`Failed to download file to: ${downloadPath}`);
                throw error;
            }
        });
    }
    acceptAlert() {
        return __awaiter(this, arguments, void 0, function* (delay = this.defaultDelay) {
            try {
                const alert = yield this.page.waitForEvent('dialog');
                if (delay > 0)
                    yield this.pause(delay);
                console.log(`Accepting alert with message: ${alert.message()}`);
                yield alert.accept();
            }
            catch (error) {
                console.error('Failed to accept alert');
                throw error;
            }
        });
    }
    dismissAlert() {
        return __awaiter(this, arguments, void 0, function* (delay = this.defaultDelay) {
            try {
                const alert = yield this.page.waitForEvent('dialog');
                console.log(`Dismissing alert with message: ${alert.message()}`);
                if (delay > 0)
                    yield this.pause(delay);
                yield alert.dismiss();
            }
            catch (error) {
                console.error('Failed to dismiss alert');
                throw error;
            }
        });
    }
    getAlertText() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alert = yield this.page.waitForEvent('dialog');
                console.log(`Alert message: ${alert.message()}`);
                return alert.message();
            }
            catch (error) {
                console.error('Failed to get alert text');
                throw error;
            }
        });
    }
    enterAlertText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const alert = yield this.page.waitForEvent('dialog');
                console.log(`Entering text "${text}" in prompt alert`);
                yield alert.accept(text);
            }
            catch (error) {
                console.error(`Failed to enter text "${text}" into alert`);
                throw error;
            }
        });
    }
}
exports.ElementUtils = ElementUtils;
