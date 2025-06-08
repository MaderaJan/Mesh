import { Credentials } from 'google-auth-library'
import { getAuthTokenFromStorage, persistToken } from '../storage/tokenRepository'
import { getGoogleTokenFromApi } from './googleAuth';

export async function getGoogleToken() {
    let validToken: Credentials;

    const storedToken = getAuthTokenFromStorage()

    if (storedToken != null) {
        validToken = storedToken;
    } else {
        const tokens = await getGoogleTokenFromApi()
        persistToken(tokens);

        validToken = tokens;
    }

    return validToken;
}