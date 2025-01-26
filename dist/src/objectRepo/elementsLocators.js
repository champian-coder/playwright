"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLocators = exports.WebTableLocators = exports.ElementsLocators = void 0;
exports.ElementsLocators = {
    elementsButton: 'text=Elements',
    webTablesButton: 'text=Web Tables',
    addButton: '#addNewRecordButton',
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#userEmail',
    ageInput: '#age',
    salaryInput: '#salary',
    departmentInput: '#department',
    submitButton: '#submit',
    tableRow: '.rt-tr-group',
    editButton: '.action-buttons span[title="Edit"]',
    deleteButton: '.action-buttons span[title="Delete"]',
};
class WebTableLocators {
}
exports.WebTableLocators = WebTableLocators;
WebTableLocators.elementsButton = 'text=Elements';
WebTableLocators.webTableMenu = 'li#item-3:has-text("Web Tables")'; // Locator for WebTable menu item
WebTableLocators.addButton = '#addNewRecordButton';
WebTableLocators.firstNameInput = '#firstName';
WebTableLocators.lastNameInput = '#lastName';
WebTableLocators.emailInput = '#userEmail';
WebTableLocators.ageInput = '#age';
WebTableLocators.salaryInput = '#salary';
WebTableLocators.departmentInput = '#department';
WebTableLocators.submitButton = '#submit';
WebTableLocators.searchBox = '#searchBox';
WebTableLocators.deleteButton = 'span[title="Delete"]';
WebTableLocators.editButton = 'span[title="Edit"]';
WebTableLocators.tableRows = '.rt-tr-group';
WebTableLocators.closeButton = 'button.close';
WebTableLocators.formModel = '#registration-form-modal';
class FileLocators {
}
exports.FileLocators = FileLocators;
FileLocators.elementsButton = 'text=Elements';
FileLocators.uploadAndDownloadMenu = 'li#item-7:has-text("Upload and Download")'; // Locator for Upload and Download menu item
FileLocators.uploadButton = '#uploadFile';
FileLocators.uploadedFilePath = '#uploadedFilePath';
FileLocators.downloadButton = '#downloadButton';
