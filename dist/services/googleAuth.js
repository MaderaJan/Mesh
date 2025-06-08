"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleTokenFromApi = getGoogleTokenFromApi;
exports.createAuthClient = createAuthClient;
const googleapis_1 = require("googleapis");
const getUserInput_1 = require("../prompts/getUserInput");
async function getGoogleTokenFromApi() {
    const oauth2Client = createAuthClient();
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.readonly']
    });
    console.log('Authorize this app by visiting this URL:\n', authUrl);
    const code = await (0, getUserInput_1.getCodeFromUser)('\nPaste the code from the browser here: ');
    return (await oauth2Client.getToken(code.trim())).tokens;
}
function createAuthClient() {
    return new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_SECRET, process.env.GOOGLE_API_KEY, 'http://localhost:3000');
}
//# sourceMappingURL=googleAuth.js.map