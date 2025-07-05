import { Command } from 'commander'
import { runMesh } from './commands/runMesh'
import { gitThreads } from './commands/gitThreads'
import dotenv from 'dotenv'

const program = new Command()

dotenv.config();

program
    .command('mesh')
    .description('This is Mesh thing Im building...')
    .action(runMesh)

program
    .command('threads')
    .description('Show my Git active threads')
    .action(gitThreads)

program.parse(process.argv)