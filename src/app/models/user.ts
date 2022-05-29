import { IUser } from "../interfaces/user";
import { Admin } from "./admin";
import { Client } from "./client";
import { Colaborator } from "./colaborator";

export class User implements IUser {
    private _id: number;
    private _email: string;
    private _password: string;
    private _name: string;
    private _surname: string;
    private _phone?: string;
    private _birthDate: string;
    private _image?: string | ArrayBuffer;
    private _forgotPasswordToken?: string;
    private _created_at: Date;
    private _updated_at: Date;
    private _deleted_at: Date;
    private _isActive: boolean;
    private _isConfirmed: boolean;
    private _client?: Client;
    private _colaborator?: Colaborator;
    private _admin?: Admin;

    constructor(body: any) {
        this._id = body.id;
        this._email = body.email;
        this._password = body.password;
        this._name = body.name;
        this._surname = body.surname;
        this._phone = body.phone;
        this._birthDate = body.birthDate;
        this._image = body.image;
        this._forgotPasswordToken = body.forgotPasswordToken;
        this._created_at = body.created_at;
        this._updated_at = body.updated_at;
        this._deleted_at = body.deleted_at;
        this._isActive = body.isActive;
        this._isConfirmed = body.isConfirmed;
        this._client = body.client;
        this._colaborator = body.colaborator;
        this._admin = body.admin;
    }

    static fromJson(body: string) {
        const parsedBody = JSON.parse(body);
        return new User(parsedBody);
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get surname(): string {
        return this._surname;
    }
    public set surname(value: string) {
        this._surname = value;
    }
    public get phone(): string | undefined {
        return this._phone;
    }
    public set phone(value: string | undefined) {
        this._phone = value;
    }
    public get birthDate(): string {
        return this._birthDate;
    }
    public set birthDate(value: string) {
        this._birthDate = value;
    }
    public get image(): string | ArrayBuffer | undefined {
        return this._image;
    }
    public set image(value: string | ArrayBuffer | undefined) {
        this._image = value;
    }
    public get forgotPasswordToken(): string | undefined {
        return this._forgotPasswordToken;
    }
    public set forgotPasswordToken(value: string | undefined) {
        this._forgotPasswordToken = value;
    }
    public get created_at(): Date {
        return this._created_at;
    }
    public set created_at(value: Date) {
        this._created_at = value;
    }
    public get updated_at(): Date {
        return this._updated_at;
    }
    public set updated_at(value: Date) {
        this._updated_at = value;
    }
    public get deleted_at(): Date {
        return this._deleted_at;
    }
    public set deleted_at(value: Date) {
        this._deleted_at = value;
    }
    public get isActive(): boolean {
        return this._isActive;
    }
    public set isActive(value: boolean) {
        this._isActive = value;
    }
    public get isConfirmed(): boolean {
        return this._isConfirmed;
    }
    public set isConfirmed(value: boolean) {
        this._isConfirmed = value;
    }
    public get client(): Client | undefined {
        return this._client;
    }
    public set client(value: Client | undefined) {
        this._client = value;
    }
    public get colaborator(): Colaborator | undefined {
        return this._colaborator;
    }
    public set colaborator(value: Colaborator | undefined) {
        this._colaborator = value;
    }
    public get admin(): Admin | undefined {
        return this._admin;
    }
    public set admin(value: Admin | undefined) {
        this._admin = value;
    }

}
