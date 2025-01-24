"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookStoreLocators = void 0;
// export const BookStoreLocators = {
//     bookStoreAppButton: 'text=Book Store Application',
//     loginButton: 'text=Login',
//     usernameInput: '#userName',
//     passwordInput: '#password',
//     loginSubmitButton: '#login',
//     logoutButton: '#submit:has-text("Log out")',
//   };
exports.BookStoreLocators = {
    bookStoreAppButton: 'text=Book Store Application',
    loginButton: '#login', // Target the button directly using its id
    usernameInput: '#userName',
    passwordInput: '#password',
    loginSubmitButton: '#login', // Assuming this is the same button for submit
    logoutButton: '#submit:has-text("Log out")',
};
