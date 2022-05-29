import { JobStatus } from "../enum/job-status";
import { IClient } from "./client";
import { IColaborator } from "./colaborator";
import { IJobSnapshot } from "./job-snapshot";
import { IJobStatusInterface } from "./job-status-interface";

export interface IJob {
    id: number;
    title: string;
    description: string;
    expires_at?: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    isActive: boolean;
    colaborators?: Array<IColaborator>;
    client?: IClient;
    status?: IJobStatusInterface;
    snapshots?: Array<IJobSnapshot>
}