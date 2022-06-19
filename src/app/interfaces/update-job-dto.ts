export interface IUpdateJobDto {
    description?: string;
    clientId: number;
    expires_at?: Date;
    images?: Array<File>;
    responsibleUserId: number;
}