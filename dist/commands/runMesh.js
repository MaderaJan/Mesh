import dotenv from 'dotenv';
import { getGoogleToken } from '../services/authService.js';
import { createAuthClient } from '../services/googleAuth.js';
import { getDaySummary } from '../services/calendarFetcher.js';
export async function runMesh() {
    dotenv.config();
    const token = await getGoogleToken();
    await getDaySummary(token, createAuthClient());
}
// TODO: Write tests
// TODO: impl structure as propoused by AI
// TODO: Continue with impl for github
function getDayBounds({ date = new Date() }) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return { startOfDay, endOfDay };
}
//# sourceMappingURL=runMesh.js.map