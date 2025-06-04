import readline from 'readline';
export function getCodeFromUser() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('\nPaste the code from the browser here: ', (code) => {
            rl.close();
            resolve(code);
        });
    });
}
//# sourceMappingURL=getCodeFromUser.js.map