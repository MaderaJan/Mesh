"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitThreads = gitThreads;
const gitlabFetcher_1 = require("../services/gitlabFetcher");
async function gitThreads() {
    await (0, gitlabFetcher_1.getMyOpenMergeRequest)();
}
//# sourceMappingURL=gitThreads.js.map