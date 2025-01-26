"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowLoctor = exports.AlertLocators = void 0;
exports.AlertLocators = {
    alertsFrameWindowsMenu: 'text=Alerts, Frame & Windows',
    alertsMenu: 'li#item-1:has-text("Alerts")',
    alertButton: '#alertButton',
    timerAlertButton: '#timerAlertButton',
    confirmButton: '#confirmButton',
    promptButton: '#promtButton'
};
exports.WindowLoctor = {
    alertsFrameWindowsMenu: 'text=Alerts, Frame & Windows',
    browserWindowsMenu: 'li#item-0:has-text("Browser Windows")',
    newTabButton: '#tabButton',
    newWindowButton: '#windowButton',
    newWindowMessage: '#message',
    messageWindowButton: '#messageWindowButton'
};
