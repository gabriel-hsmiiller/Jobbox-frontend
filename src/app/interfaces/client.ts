import { IUser } from "./user";

export interface IClient {
    id: number;
    user: IUser;
}