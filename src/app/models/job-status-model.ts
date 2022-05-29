import { JobStatus } from "../enum/job-status";
import { IJobStatusInterface } from "../interfaces/job-status-interface";
import { Job } from "./job";

export class JobStatusModel implements IJobStatusInterface {
    private _id: number;
    private _status: JobStatus;
    private _jobs: Array<Job>;
    
    constructor(body: any) {
        this._id = body.id;
        this._status = body.status;
        this._jobs = body.jobs;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get status(): JobStatus {
        return this._status;
    }
    public set status(value: JobStatus) {
        this._status = value;
    }
    public get jobs(): Array<Job> {
        return this._jobs;
    }
    public set jobs(value: Array<Job>) {
        this._jobs = value;
    }
}