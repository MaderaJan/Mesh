import { google } from 'googleapis';
import readline from 'readline';
import fileSystem from 'fs';
import dotenv from 'dotenv';
const TOKEN_FILE_PATH = 'token.json';
export async function runMesh() {
    const oauth2Client = createAuthClient();
    const token = await getToken(oauth2Client);
    await getDaySummary(token, oauth2Client);
}
async function getToken(oauth2Client) {
    dotenv.config();
    let validToken;
    const storedToken = getAuthTokenFromStorage();
    if (storedToken != null) {
        validToken = storedToken;
    }
    else {
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar.readonly']
        });
        console.log('Authorize this app by visiting this URL:\n', authUrl);
        const code = await getCodeFromUser();
        const { tokens } = await oauth2Client.getToken(code.trim());
        persistToken(tokens);
        validToken = tokens;
    }
    return validToken;
}
function createAuthClient() {
    return new google.auth.OAuth2(process.env.GOOGLE_SECRET, process.env.GOOGLE_API_KEY, 'http://localhost:3000');
}
function getCodeFromUser() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('\nPaste the code from the browser here: ', (code) => {
            rl.close();
            resolve(code);
        });
    });
}
function persistToken(tokens) {
    fileSystem.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokens));
}
async function getDaySummary(tokens, oauth2Client) {
    try {
        oauth2Client.setCredentials(tokens);
        console.log('✅ Access token received!');
        const { startOfDay, endOfDay } = getDayBounds({});
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log("startOfDay:" + startOfDay);
        console.log("startOfDay:" + endOfDay);
        console.log("timeZone:" + timeZone);
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const res = await calendar.events.list({
            calendarId: 'primary',
            timeMin: startOfDay.toISOString(),
            timeMax: endOfDay.toISOString(),
            timeZone: timeZone,
            singleEvents: true,
            orderBy: 'startTime',
        });
        console.log('Upcoming events:');
        res.data.items?.forEach(event => {
            console.log('Event: ', event.summary);
            console.log('Start: ', event.start?.dateTime);
            console.log('End: ', event.end?.dateTime);
            console.log('----');
        });
    }
    catch (err) {
        console.error('❌ Failed to get token', err);
    }
}
function getAuthTokenFromStorage() {
    try {
        if (fileSystem.existsSync(TOKEN_FILE_PATH)) {
            const raw = fileSystem.readFileSync(TOKEN_FILE_PATH).toString();
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
// TODO: Write unit tests
function getDayBounds({ date = new Date() }) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return { startOfDay, endOfDay };
}
//# sourceMappingURL=mesh.js.map