import { IAdmin } from "./admin";
import { IClient } from "./client";
import { IColaborator } from "./colaborator";

export interface IUser {
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    phone?: string;
    birthDate: string;
    image?: string | ArrayBuffer;
    forgotPasswordToken?: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    isActive: boolean;
    isConfirmed: boolean;
    colaborator?: IColaborator;
    client?: IClient;
    admin?: IAdmin;
}
