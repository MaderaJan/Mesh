import fileSystem from 'fs';
const TOKEN_FILE_PATH = 'token.json';
export function getAuthTokenFromStorage() {
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
export function persistToken(tokens) {
    fileSystem.writeFileSync(TOKEN_FILE_PATH, JSON.stringify(tokens));
}
//# sourceMappingURL=tokenStorage.js.map