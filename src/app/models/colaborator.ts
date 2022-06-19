import { IColaborator } from "../interfaces/colaborator";
import { Job } from "./job";
import { User } from "./user";

export class Colaborator implements IColaborator {
    private _id: number;
    private _user: User;
    private _jobs: Array<Job>;
    
    constructor(body: any) {
        this._id = body.id;
        this._user = body.user;
        this._jobs = body.jobs;
    }
    
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    public get jobs(): Array<Job> {
        return this._jobs;
    }
    public set jobs(value: Array<Job>) {
        this._jobs = value;
    }
}