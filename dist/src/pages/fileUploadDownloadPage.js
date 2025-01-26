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
exports.FilePage = void 0;
const elementsLocators_1 = require("../objectRepo/elementsLocators");
const element_utils_1 = require("../helper/utils/element-utils");
class FilePage {
    constructor(page) {
        this.page = page;
        this.utils = new element_utils_1.ElementUtils(page);
    }
    navigateToUploadDownloadPage() {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.utils.click(this.page.locator(FileLocators.elementsButton));
            yield this.utils.click(this.page.locator(elementsLocators_1.FileLocators.uploadAndDownloadMenu));
        });
    }
    uploadFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Uploading a file...');
            yield this.page.setInputFiles(elementsLocators_1.FileLocators.uploadButton, filePath);
        });
    }
    getUploadedFilePath() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Fetching uploaded file path...');
            return yield this.utils.getText(this.page.locator(elementsLocators_1.FileLocators.uploadedFilePath));
        });
    }
    downloadFile() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Downloading a file...');
            const [download] = yield Promise.all([
                this.page.waitForEvent('download'),
                this.utils.click(this.page.locator(elementsLocators_1.FileLocators.downloadButton))
            ]);
            const downloadPath = yield download.path();
            console.log(`File downloaded to: ${downloadPath}`);
            return downloadPath;
        });
    }
}
exports.FilePage = FilePage;
