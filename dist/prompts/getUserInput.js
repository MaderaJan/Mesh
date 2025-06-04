import readline from 'readline';
export function getCodeFromUser(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(question, (code) => {
            rl.close();
            resolve(code);
        });
    });
}
//# sourceMappingURL=getUserInput.js.map