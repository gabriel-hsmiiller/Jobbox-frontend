import { JobSnapshotChangeDetail } from "../enum/job-snapshot-change-detail.enum";
import { JobStatus } from "../enum/job-status";
import { IJobSnapshot } from "../interfaces/job-snapshot";

export class JobSnapshot implements IJobSnapshot {
    private __id: any;
    private _title: string;
    private _description: string;
    private _expires_at: Date;
    private _status: JobStatus;
    private _jobId: number;
    private _content: Array<string>;
    private _responsibleUserId: number;
    private _updated_at: Date;
    private _changeDetail: JobSnapshotChangeDetail;

    constructor(body: any) {
        this.__id = body._id;
        this._title = body.title;
        this._description = body.description;
        this._expires_at = body.expires_at;
        this._status = body.status;
        this._jobId = body.jobId;
        this._content = body.content;
        this._responsibleUserId = body.responsibleUserId;
        this._updated_at = body.updated_at
        this._changeDetail = body.changeDetail;
    }

    public get _id(): any {
        return this.__id;
    }
    public set _id(value: any) {
        this.__id = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get expires_at(): Date {
        return this._expires_at;
    }
    public set expires_at(value: Date) {
        this._expires_at = value;
    }
    public get status(): JobStatus {
        return this._status;
    }
    public set status(value: JobStatus) {
        this._status = value;
    }
    public get jobId(): number {
        return this._jobId;
    }
    public set jobId(value: number) {
        this._jobId = value;
    }
    public get content(): Array<string> {
        return this._content;
    }
    public set content(value: Array<string>) {
        this._content = value;
    }
    public get responsibleUserId(): number {
        return this._responsibleUserId;
    }
    public set responsibleUserId(value: number) {
        this._responsibleUserId = value;
    }
    public get updated_at(): Date {
        return this._updated_at;
    }
    public set updated_at(value: Date) {
        this._updated_at = value;
    }
    public get changeDetail(): JobSnapshotChangeDetail {
        return this._changeDetail;
    }
    public set changeDetail(value: JobSnapshotChangeDetail) {
        this._changeDetail = value;
    }
}