import { getMyOpenMergeRequest } from "../services/gitlabFetcher";

export async function gitThreads() {
    await getMyOpenMergeRequest()
}
