export interface ICreateJobDto {
    title: string;
    description: string;
    clientId: number;
    expires_at?: Date;
    autofill_colaborator: boolean;
}