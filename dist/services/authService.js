"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleToken = getGoogleToken;
const tokenRepository_1 = require("../storage/tokenRepository");
const googleAuth_1 = require("./googleAuth");
async function getGoogleToken() {
    let validToken;
    const storedToken = (0, tokenRepository_1.getAuthTokenFromStorage)();
    if (storedToken != null) {
        validToken = storedToken;
    }
    else {
        const tokens = await (0, googleAuth_1.getGoogleTokenFromApi)();
        (0, tokenRepository_1.persistToken)(tokens);
        validToken = tokens;
    }
    return validToken;
}
//# sourceMappingURL=authService.js.map