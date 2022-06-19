import { JobStatus } from "../enum/job-status";
import { IJob } from "./job";

export interface IJobStatusInterface {
    id: number;
    status: JobStatus;
    jobs: Array<IJob>;
}