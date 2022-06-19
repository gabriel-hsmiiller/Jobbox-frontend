import { IReportDto } from "../interfaces/report-dto";

export class ReportDto implements IReportDto {
    private __id: any;
    private _description: string;
    private _theme: any;
    private _data: any;
    private _created_at: Date | null | undefined;

    constructor(body: any) {
        this.__id = body._id;
        this._description = body.description;
        this._theme = body.theme;
        this._data = body.data;
        this._created_at = body.created_at;
    }

    public get _id(): any {
        return this.__id;
    }
    public set _id(value: any) {
        this.__id = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get theme(): any {
        return this._theme;
    }
    public set theme(value: any) {
        this._theme = value;
    }

    public get data(): any {
        return this._data;
    }
    public set data(value: any) {
        this._data = value;
    }

    public get created_at(): Date | null | undefined {
        return this._created_at;
    }
    public set created_at(value: Date | null | undefined) {
        this._created_at = value;
    }
}
