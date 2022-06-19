import { Job } from "../models/job";
import { JobSnapshot } from "../models/job-snapshot";

export type JobResponse = {
    job: Job;
    snapshot: JobSnapshot;
}
  