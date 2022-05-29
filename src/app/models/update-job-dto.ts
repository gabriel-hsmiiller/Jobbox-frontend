import { IUpdateJobDto } from "../interfaces/update-job-dto";

export class UpdateJobDto implements IUpdateJobDto {
    private _description?: string | undefined;
    private _clientId: number;
    private _expires_at?: Date | undefined;
    private _images?: Array<File> | undefined;
    private _responsibleUserId: number;
    
    constructor(body: any) {
        this._description = body.description;
        this._clientId = body.clientId;
        this._expires_at = body.expires_at;
        this._images = body.images;
        this._responsibleUserId = body.responsibleUserId;
    }

    public get description(): string | undefined {
        return this._description;
    }
    public set description(value: string | undefined) {
        this._description = value;
    }
    public get clientId(): number {
        return this._clientId;
    }
    public set clientId(value: number) {
        this._clientId = value;
    }
    public get expires_at(): Date | undefined {
        return this._expires_at;
    }
    public set expires_at(value: Date | undefined) {
        this._expires_at = value;
    }
    public get images(): Array<File> | undefined {
        return this._images;
    }
    public set images(value: Array<File> | undefined) {
        this._images = value;
    }
    public get responsibleUserId(): number {
        return this._responsibleUserId;
    }
    public set responsibleUserId(value: number) {
        this._responsibleUserId = value;
    }
}