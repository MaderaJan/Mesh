import readline from 'readline'

export function getCodeFromUser(question: string): Promise<string> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        rl.question(question, (code) => {
            rl.close()
            resolve(code)
        })
    })
}
