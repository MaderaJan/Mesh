import fileSystem from 'fs'
import { Credentials } from 'google-auth-library';

const TOKEN_FILE_PATH = 'token.json'

export function getAuthTokenFromStorage(): Credentials | null {
    try {
        if (fileSystem.existsSync(TOKEN_FILE_PATH)) {
            const raw = fileSystem.readFileSync(TOKEN_FILE_PATH).toString();
            const tokens: Credentials = JSON.parse(raw);

            return tokens

        } else {
            return null
        }
    } catch (err) {
        console.log('Token was not retrevied from storage')
        return null
    }
}

export function persistToken(tokens: Credentials) {
    fileSystem.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokens));
}