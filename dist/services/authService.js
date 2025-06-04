import { getAuthTokenFromStorage, persistToken } from '../storage/tokenRepository.js';
import { getGoogleTokenFromApi } from './googleAuth.js';
export async function getGoogleToken() {
    let validToken;
    const storedToken = getAuthTokenFromStorage();
    if (storedToken != null) {
        validToken = storedToken;
    }
    else {
        const { tokens } = await getGoogleTokenFromApi();
        persistToken(tokens);
        validToken = tokens;
    }
    return validToken;
}
//# sourceMappingURL=authService.js.map