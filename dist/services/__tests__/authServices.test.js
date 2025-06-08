"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const getAuthTokenFromStorage = __importStar(require("../../storage/tokenRepository"));
const getGoogleTokenFromApi = __importStar(require("../googleAuth"));
const authService_1 = require("../authService");
const getAuthTokenFromStorageMock = jest.spyOn(getAuthTokenFromStorage, 'getAuthTokenFromStorage');
const persistToken = jest.spyOn(getAuthTokenFromStorage, 'persistToken');
const getGoogleTokenFromApiMock = jest.spyOn(getGoogleTokenFromApi, 'getGoogleTokenFromApi');
describe('getGoogleToken', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should return stored token', async () => {
        const tokenMock = {
            access_token: "abc",
            refresh_token: "def",
            expiry_date: 123456,
        };
        getAuthTokenFromStorageMock.mockReturnValue(tokenMock);
        expect(await (0, authService_1.getGoogleToken)()).toStrictEqual({
            access_token: 'abc',
            refresh_token: 'def',
            expiry_date: 123456,
        });
        expect(persistToken).toHaveBeenCalledTimes(0);
    });
    test('should return token from api', async () => {
        getAuthTokenFromStorageMock.mockReturnValue(null);
        persistToken.mockImplementation(() => { });
        getGoogleTokenFromApiMock.mockReturnValue(new Promise((resolve) => {
            const tokens = {
                access_token: 'abc',
                refresh_token: 'def',
                expiry_date: 123456,
            };
            resolve(tokens);
        }));
        expect(await (0, authService_1.getGoogleToken)()).toStrictEqual({
            access_token: 'abc',
            refresh_token: 'def',
            expiry_date: 123456,
        });
        expect(persistToken).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=authServices.test.js.map