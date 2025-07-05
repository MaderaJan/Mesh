"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyOpenMergeRequest = getMyOpenMergeRequest;
const httpHeaders_1 = require("../utils/httpHeaders");
// TODO: Move token to envs
// TODO: Refactor
async function getMyOpenMergeRequest() {
    const userToSearchFor = 'jan.madera';
    const result = await fetch('https://gitlab.int.rohlikgroup.com/api/v4/projects/1428/merge_requests?state=opened&scope=all', {
        method: 'GET',
        headers: {
            [httpHeaders_1.HTTP_HEADERS.PRIVATE_TOKEN]: process.env.GITLAB_PRIVATE_TOKEN,
            [httpHeaders_1.HTTP_HEADERS.CONTENT_TPE]: 'application/json'
        }
    });
    const mappedResult = await result.json();
    const checks = mappedResult.map(async (mergeRequest) => {
        console.log(`Checking merge request: ${mergeRequest.id} - ${mergeRequest.title}`);
        const isUserParticipant = await getMergeRequestForParticipant(mergeRequest.iid, userToSearchFor);
        return isUserParticipant ? mergeRequest : null;
    });
    const results = await Promise.all(checks);
    const mergeRequestWhereUserIsParticipant = results.filter(Boolean);
    console.log(`Merge request where ${userToSearchFor} is participant:`);
    mergeRequestWhereUserIsParticipant.forEach((mergeRequest) => {
        console.log(`Checking merge request: ${mergeRequest?.id} - ${mergeRequest?.title}`);
    });
}
async function getMergeRequestForParticipant(mergeRequestId, searchForParticipantUserName) {
    const result = await fetch(`https://gitlab.int.rohlikgroup.com/api/v4/projects/1428/merge_requests/${mergeRequestId}/participants`, {
        method: 'GET',
        headers: {
            [httpHeaders_1.HTTP_HEADERS.PRIVATE_TOKEN]: process.env.GITLAB_PRIVATE_TOKEN,
            [httpHeaders_1.HTTP_HEADERS.CONTENT_TPE]: 'application/json'
        }
    });
    const mappedResult = await result.json();
    const isUserParticipant = mappedResult.find((participant) => {
        return participant.username == searchForParticipantUserName;
    });
    if (isUserParticipant) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=gitlabFetcher.js.map