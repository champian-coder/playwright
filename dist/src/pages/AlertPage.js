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
exports.AlertsPage = void 0;
const element_utils_1 = require("../helper/utils/element-utils");
const alertsFrameWindowsLocators_1 = require("../objectRepo/alertsFrameWindowsLocators");
class AlertsPage {
    constructor(page) {
        this.page = page;
        this.utils = new element_utils_1.ElementUtils(page);
    }
    navigateToAlertsPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.AlertLocators.alertsFrameWindowsMenu));
            yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.AlertLocators.alertsMenu));
        });
    }
    clickAlertButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.AlertLocators.alertButton));
        });
    }
    clickConfirmButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.AlertLocators.confirmButton));
        });
    }
    clickPromptButton() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndClick(this.page.locator(alertsFrameWindowsLocators_1.AlertLocators.promptButton));
        });
    }
    acceptAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.acceptAlert();
        });
    }
    dismissAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.dismissAlert();
        });
    }
    getAlertMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.utils.getAlertText();
        });
    }
    enterTextInPromptAlert(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.enterAlertText(text);
        });
    }
}
exports.AlertsPage = AlertsPage;
