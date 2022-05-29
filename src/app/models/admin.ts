import { IAdmin } from "../interfaces/admin";
import { User } from "./user";

export class Admin implements IAdmin {
    private _id: number;
    private _user: User;
    
    constructor(body: any) {
        this._id = body.id;
        this._user = body.user;
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
}