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
exports.ElementsPage = void 0;
const element_utils_1 = require("../helper/utils/element-utils");
const elementsLocators_1 = require("../objectRepo/elementsLocators");
class ElementsPage {
    constructor(page) {
        this.page = page;
        this.utils = new element_utils_1.ElementUtils(page);
    }
    navigateToWebTables() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.click(this.page.locator(elementsLocators_1.ElementsLocators.elementsButton));
            yield this.utils.click(this.page.locator(elementsLocators_1.ElementsLocators.webTablesButton));
        });
    }
    addNewRecord(firstName, lastName, email, age, salary, department) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.click(this.page.locator(elementsLocators_1.ElementsLocators.addButton));
            yield this.utils.type(this.page.locator(elementsLocators_1.ElementsLocators.firstNameInput), firstName);
            yield this.utils.type(this.page.locator(elementsLocators_1.ElementsLocators.lastNameInput), lastName);
            yield this.utils.type(this.page.locator(elementsLocators_1.ElementsLocators.emailInput), email);
            yield this.utils.type(this.page.locator(elementsLocators_1.ElementsLocators.ageInput), age);
            yield this.utils.type(this.page.locator(elementsLocators_1.ElementsLocators.salaryInput), salary);
            yield this.utils.type(this.page.locator(elementsLocators_1.ElementsLocators.departmentInput), department);
            yield this.utils.click(this.page.locator(elementsLocators_1.ElementsLocators.submitButton));
        });
    }
    isRecordPresent(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = this.page.locator(elementsLocators_1.ElementsLocators.tableRow);
            for (let i = 0; i < (yield rows.count()); i++) {
                const rowText = yield rows.nth(i).textContent();
                if (rowText && rowText.includes(email)) {
                    return true;
                }
            }
            return false;
        });
    }
}
exports.ElementsPage = ElementsPage;
