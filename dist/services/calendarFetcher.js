"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaySummary = getDaySummary;
const googleapis_1 = require("googleapis");
const dateUtils_1 = require("../utils/dateUtils");
async function getDaySummary(tokens, oauth2Client) {
    try {
        oauth2Client.setCredentials(tokens);
        console.log('✅ Access token received!');
        const { startOfDay, endOfDay } = (0, dateUtils_1.getDayBounds)({});
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log("startOfDay:" + startOfDay);
        console.log("startOfDay:" + endOfDay);
        console.log("timeZone:" + timeZone);
        const calendar = googleapis_1.google.calendar({ version: 'v3', auth: oauth2Client });
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
//# sourceMappingURL=calendarFetcher.js.map