import { google } from 'googleapis'
import { getCodeFromUser } from '../prompts/getUserInput';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { Credentials } from 'google-auth-library'

export async function getGoogleTokenFromApi(): Promise<Credentials> {
    const oauth2Client = createAuthClient()

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.readonly']
    });

    console.log('Authorize this app by visiting this URL:\n', authUrl);
    const code = await getCodeFromUser('\nPaste the code from the browser here: ');

    return (await oauth2Client.getToken(code.trim())).tokens
}

export function createAuthClient() {
    return new google.auth.OAuth2(
        process.env.GOOGLE_SECRET,
        process.env.GOOGLE_API_KEY,
        'http://localhost:3000'
    );
}