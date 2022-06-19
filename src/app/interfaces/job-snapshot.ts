import { JobSnapshotChangeDetail } from "../enum/job-snapshot-change-detail.enum";
import { JobStatus } from "../enum/job-status";

export interface IJobSnapshot {
    _id: any;
    description: string;
    expires_at: Date;
    status: JobStatus;
    jobId: number;
    content: Array<string>;
    updated_at: Date;
    responsibleUserId: number;
    changeDetail: JobSnapshotChangeDetail;
}