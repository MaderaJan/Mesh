"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMesh = runMesh;
const dotenv_1 = __importDefault(require("dotenv"));
const authService_js_1 = require("../services/authService.js");
const googleAuth_js_1 = require("../services/googleAuth.js");
const calendarFetcher_js_1 = require("../services/calendarFetcher.js");
async function runMesh() {
    dotenv_1.default.config();
    const token = await (0, authService_js_1.getGoogleToken)();
    await (0, calendarFetcher_js_1.getDaySummary)(token, (0, googleAuth_js_1.createAuthClient)());
}
//# sourceMappingURL=runMesh.js.map