import { google } from 'googleapis'
import { Credentials, OAuth2Client } from 'google-auth-library';
import { getDayBounds } from '../utils/dateUtils.js';

export async function getDaySummary(tokens: Credentials, oauth2Client: OAuth2Client) {
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
    } catch (err) {
        console.error('❌ Failed to get token', err);
    }
}