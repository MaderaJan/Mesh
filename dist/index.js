"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const runMesh_1 = require("./commands/runMesh");
const gitThreads_1 = require("./commands/gitThreads");
const dotenv_1 = __importDefault(require("dotenv"));
const program = new commander_1.Command();
dotenv_1.default.config();
program
    .command('mesh')
    .description('This is Mesh thing Im building...')
    .action(runMesh_1.runMesh);
program
    .command('threads')
    .description('Show my Git active threads')
    .action(gitThreads_1.gitThreads);
program.parse(process.argv);
//# sourceMappingURL=index.js.map