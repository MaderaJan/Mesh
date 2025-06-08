"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthTokenFromStorage = getAuthTokenFromStorage;
exports.persistToken = persistToken;
const fs_1 = __importDefault(require("fs"));
const TOKEN_FILE_PATH = 'token.json';
function getAuthTokenFromStorage() {
    try {
        if (fs_1.default.existsSync(TOKEN_FILE_PATH)) {
            const raw = fs_1.default.readFileSync(TOKEN_FILE_PATH).toString();
            const tokens = JSON.parse(raw);
            return tokens;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log('Token was not retrevied from storage');
        return null;
    }
}
function persistToken(tokens) {
    fs_1.default.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokens));
}
//# sourceMappingURL=tokenRepository.js.map