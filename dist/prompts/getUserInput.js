"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeFromUser = getCodeFromUser;
const readline_1 = __importDefault(require("readline"));
function getCodeFromUser(question) {
    return new Promise((resolve) => {
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(question, (code) => {
            rl.close();
            resolve(code);
        });
    });
}
//# sourceMappingURL=getUserInput.js.map