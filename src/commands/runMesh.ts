import { Credentials } from 'google-auth-library';
import dotenv from 'dotenv'
import { getGoogleToken } from '../services/authService.js';
import { createAuthClient } from '../services/googleAuth.js';
import { getDaySummary } from '../services/calendarFetcher.js';

export async function runMesh() {
    dotenv.config();

    const token: Credentials = await getGoogleToken();

    await getDaySummary(token, createAuthClient());
}