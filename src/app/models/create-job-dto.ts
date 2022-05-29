import { ICreateJobDto } from "../interfaces/create-job-dto";

export class CreateJobDto implements ICreateJobDto {
    private _title: string;
    private _description: string;
    private _clientId: number;
    private _expires_at?: Date | undefined;
    private _autofill_colaborator: boolean;
    
    constructor(body: any) {
        this._title = body.title;
        this._description = body.description;
        this._clientId = body.clientId;
        this._expires_at = body.expires_at;
        this._autofill_colaborator = body.autofill_colaborator;
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
    public get autofill_colaborator(): boolean {
        return this._autofill_colaborator;
    }
    public set autofill_colaborator(value: boolean) {
        this._autofill_colaborator = value;
    }

}