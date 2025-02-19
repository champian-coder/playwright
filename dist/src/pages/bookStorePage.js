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
exports.BookStorePage = void 0;
const element_utils_1 = require("../helper/utils/element-utils");
const bookStoreLocators_1 = require("../objectRepo/bookStoreLocators");
class BookStorePage {
    constructor(page) {
        this.page = page;
        this.utils = new element_utils_1.ElementUtils(page);
    }
    navigateToBookStore() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndClick(this.page.locator(bookStoreLocators_1.BookStoreLocators.bookStoreAppButton));
        });
    }
    navigateToLoginPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndClick(this.page.locator(bookStoreLocators_1.BookStoreLocators.loginButton));
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndType(this.page.locator(bookStoreLocators_1.BookStoreLocators.usernameInput), username);
            yield this.utils.waitAndType(this.page.locator(bookStoreLocators_1.BookStoreLocators.passwordInput), password);
            yield this.utils.waitAndClick(this.page.locator(bookStoreLocators_1.BookStoreLocators.loginSubmitButton));
        });
    }
    isLogoutButtonVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.locator(bookStoreLocators_1.BookStoreLocators.logoutButton).isVisible();
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.utils.waitAndClick(this.page.locator(bookStoreLocators_1.BookStoreLocators.logoutButton));
        });
    }
    isLoginButtonVisible() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.locator(bookStoreLocators_1.BookStoreLocators.loginButton).isVisible();
        });
    }
}
exports.BookStorePage = BookStorePage;
