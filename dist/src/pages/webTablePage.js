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
exports.WebTablePage = void 0;
const elementsLocators_1 = require("../objectRepo/elementsLocators");
const element_utils_1 = require("../helper/utils/element-utils");
class WebTablePage {
    constructor(page) {
        this.page = page;
        this.utils = new element_utils_1.ElementUtils(page);
    }
    navigateToWebTable() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Navigating to Web Tables...');
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.elementsButton));
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.webTableMenu));
        });
    }
    addNewRecord(firstName, lastName, email, age, salary, department) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Adding a new record...');
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.addButton));
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.firstNameInput), firstName);
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.lastNameInput), lastName);
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.emailInput), email);
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.ageInput), age);
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.salaryInput), salary);
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.departmentInput), department);
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.submitButton));
        });
    }
    isRecordAdded() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Checking if record was successfully added...');
            return yield this.utils.isElementVisible(this.page.locator(elementsLocators_1.WebTableLocators.formModel), 1000);
        });
    }
    searchRecord(query) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Searching for record with query: ${query}`);
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.searchBox), query);
        });
    }
    closeForm() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Closing the form...');
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.closeButton));
        });
    }
    deleteFirstRecord() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Deleting the first record...');
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.deleteButton).first());
        });
    }
    editFirstRecord(newDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Editing the first record...');
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.editButton).first());
            yield this.utils.type(this.page.locator(elementsLocators_1.WebTableLocators.departmentInput), newDepartment);
            yield this.utils.click(this.page.locator(elementsLocators_1.WebTableLocators.submitButton));
        });
    }
    getRowCount() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Getting the number of rows in the table...');
            return yield this.page.locator(elementsLocators_1.WebTableLocators.tableRows).count();
        });
    }
}
exports.WebTablePage = WebTablePage;
