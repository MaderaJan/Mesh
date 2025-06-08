"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const runMesh_1 = require("./commands/runMesh");
const program = new commander_1.Command();
program
    .command('mesh')
    .description('This is Mesh thing Im building...')
    .action(runMesh_1.runMesh);
program.parse(process.argv);
//# sourceMappingURL=index.js.map