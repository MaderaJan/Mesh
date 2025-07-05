"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMesh = runMesh;
const authService_js_1 = require("../services/authService.js");
const googleAuth_js_1 = require("../services/googleAuth.js");
const calendarFetcher_js_1 = require("../services/calendarFetcher.js");
async function runMesh() {
    const token = await (0, authService_js_1.getGoogleToken)();
    await (0, calendarFetcher_js_1.getDaySummary)(token, (0, googleAuth_js_1.createAuthClient)());
}
//# sourceMappingURL=runMesh.js.map