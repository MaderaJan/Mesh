import { HTTP_METHODS } from "../utils/httpMethods";
import { HTTP_HEADERS } from "../utils/httpHeaders";

// TODO: Refactor

export async function getMyOpenMergeRequest() {
    const userToSearchFor = 'jan.madera'

    const result = await fetch('https://gitlab.int.rohlikgroup.com/api/v4/projects/1428/merge_requests?state=opened&scope=all', {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.PRIVATE_TOKEN]: process.env.GITLAB_PRIVATE_TOKEN!!,
            [HTTP_HEADERS.CONTENT_TPE]: 'application/json'
        }
    })

    const mappedResult = await result.json() as MergeRequest[];

    const checks = mappedResult.map(async (mergeRequest) => {
        console.log(`Checking merge request: ${mergeRequest.id} - ${mergeRequest.title}`)

        const isUserParticipant = await getMergeRequestForParticipant(mergeRequest.iid, userToSearchFor);
        return isUserParticipant ? mergeRequest : null;
    })

    const results = await Promise.all(checks);
    const mergeRequestWhereUserIsParticipant = results.filter(Boolean);

    console.log(`Merge request where ${userToSearchFor} is participant:`)
    mergeRequestWhereUserIsParticipant.forEach((mergeRequest) => {
        console.log(`Checking merge request: ${mergeRequest?.id} - ${mergeRequest?.title}`)
    })
}

async function getMergeRequestForParticipant(mergeRequestId: number, searchForParticipantUserName: string): Promise<boolean> {
    const result = await fetch(`https://gitlab.int.rohlikgroup.com/api/v4/projects/1428/merge_requests/${mergeRequestId}/participants`, {
        method: 'GET',
        headers: {
            [HTTP_HEADERS.PRIVATE_TOKEN]: process.env.GITLAB_PRIVATE_TOKEN!!,
            [HTTP_HEADERS.CONTENT_TPE]: 'application/json'
        }
    })

    const mappedResult = await result.json() as Participant[];
    const isUserParticipant = mappedResult.find((participant) => {
        return participant.username == searchForParticipantUserName
    })

    if (isUserParticipant) {
        return true
    } else {
        return false
    }
}

export interface Participant {
    id: number
    username: string,
}

export interface MergeRequest {
    id: number,
    iid: number,
    title: string,
    author: MergeRequestAuthor
}

export interface MergeRequestAuthor {
    id: number
    username: string,
}