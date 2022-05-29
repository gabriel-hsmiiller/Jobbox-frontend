import { IUpdateJobColaboratorsDto } from "../interfaces/update-job-colaborators-dto";

export class UpdateJobColaboratorsDto implements IUpdateJobColaboratorsDto {
    private _colaboratorsId?: Array<number | undefined> | undefined;
    
    constructor(body: any) {
        this._colaboratorsId = body.colaboratorsId;
    }

    public get colaboratorsId(): Array<number | undefined> | undefined {
        return this._colaboratorsId;
    }
    public set colaboratorsId(value: Array<number | undefined> | undefined) {
        this._colaboratorsId = value;
    }
}