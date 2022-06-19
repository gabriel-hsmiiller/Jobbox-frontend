import { IJob } from "../interfaces/job";
import { Client } from "./client";
import { Colaborator } from "./colaborator";
import { JobSnapshot } from "./job-snapshot";
import { JobStatusModel } from "./job-status-model";

export class Job implements IJob {
    private _id: number;
    private _title: string;
    private _description: string;
    private _expires_at?: Date | undefined;
    private _created_at: Date;
    private _updated_at: Date;
    private _deleted_at: Date;
    private _isActive: boolean;
    private _colaborators?: Colaborator[] | undefined;
    private _client?: Client | undefined;
    private _status?: JobStatusModel | undefined;
    private _snapshots?: Array<JobSnapshot> | undefined;
    
    constructor(body: any) {
        this._id = body.id;
        this._title = body.title;
        this._description = body.description;
        this._expires_at = body.expires_at;
        this._created_at = body.created_at;
        this._updated_at = body.updated_at;
        this._deleted_at = body.deleted_at;
        this._isActive = body.isActive;
        this._colaborators = body.colaborators;
        this._client = body.client;
        this._status = body.status;
    }

    static fromJson(body: string) {
        const parsedBody = JSON.parse(body);
        return new Job(parsedBody);
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
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
    public get expires_at(): Date | undefined {
        return this._expires_at;
    }
    public set expires_at(value: Date | undefined) {
        this._expires_at = value;
    }
    public get created_at(): Date {
        return this._created_at;
    }
    public set created_at(value: Date) {
        this._created_at = value;
    }
    public get updated_at(): Date {
        return this._updated_at;
    }
    public set updated_at(value: Date) {
        this._updated_at = value;
    }
    public get deleted_at(): Date {
        return this._deleted_at;
    }
    public set deleted_at(value: Date) {
        this._deleted_at = value;
    }
    public get isActive(): boolean {
        return this._isActive;
    }
    public set isActive(value: boolean) {
        this._isActive = value;
    }
    public get colaborators(): Colaborator[] | undefined {
        return this._colaborators;
    }
    public set colaborators(value: Colaborator[] | undefined) {
        this._colaborators = value;
    }
    public get client(): Client | undefined {
        return this._client;
    }
    public set client(value: Client | undefined) {
        this._client = value;
    }
    public get status(): JobStatusModel | undefined {
        return this._status;
    }
    public set status(value: JobStatusModel | undefined) {
        this._status = value;
    }
    public get snapshots(): Array<JobSnapshot> | undefined {
        return this._snapshots;
    }
    public set snapshots(value: Array<JobSnapshot> | undefined) {
        this._snapshots = value;
    }
    
}