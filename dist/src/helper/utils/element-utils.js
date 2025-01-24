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
        this.defaultDelay = 1000; // Set default delay to 1 second (1000ms)
    }
    // Function to pause execution for a certain amount of time
    pause(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Pausing for ${ms}ms...`);
            yield this.page.waitForTimeout(ms);
        });
    }
    click(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 5000, delay = this.defaultDelay) {
            try {
                // Wait for the element to be visible before clicking
                yield locator.waitFor({ state: 'visible', timeout });
                yield locator.click();
                console.log(`Clicked on locator: ${locator}`);
                // Pause after click
                yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to click on locator: ${locator}`);
                throw error;
            }
        });
    }
    type(locator_1, text_1) {
        return __awaiter(this, arguments, void 0, function* (locator, text, timeout = 5000, delay = this.defaultDelay) {
            try {
                // Wait for the element to be visible before typing
                yield locator.waitFor({ state: 'visible', timeout });
                yield locator.fill(text);
                console.log(`Typed "${text}" into locator: ${locator}`);
                // Pause after typing
                yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to type into locator: ${locator}`);
                throw error;
            }
        });
    }
    waitForElement(locator_1, state_1) {
        return __awaiter(this, arguments, void 0, function* (locator, state, timeout = 5000, delay = this.defaultDelay) {
            try {
                // Wait for the element to be in the specified state
                yield locator.waitFor({ state, timeout });
                console.log(`Element ${locator} is ${state}`);
                // Pause after waiting for the element
                yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to wait for locator: ${locator} to be ${state}`);
                throw error;
            }
        });
    }
    waitForVisibility(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 5000, delay = this.defaultDelay) {
            try {
                // Wait for the element to be visible
                yield locator.waitFor({ state: 'visible', timeout });
                console.log(`Element ${locator} is visible`);
                // Pause after visibility check
                yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to wait for locator: ${locator} to be visible`);
                throw error;
            }
        });
    }
    waitForInvisibility(locator_1) {
        return __awaiter(this, arguments, void 0, function* (locator, timeout = 5000, delay = this.defaultDelay) {
            try {
                // Wait for the element to be hidden
                yield locator.waitFor({ state: 'hidden', timeout });
                console.log(`Element ${locator} is hidden`);
                // Pause after waiting for invisibility
                yield this.pause(delay);
            }
            catch (error) {
                console.error(`Failed to wait for locator: ${locator} to be hidden`);
                throw error;
            }
        });
    }
}
exports.ElementUtils = ElementUtils;
