import { Command } from 'commander';
import { runMesh } from './commands/mesh.js';
const program = new Command();
program
    .command('mesh')
    .description('This is Mesh thing Im building...')
    .action(runMesh);
program.parse(process.argv);
//# sourceMappingURL=index.js.map