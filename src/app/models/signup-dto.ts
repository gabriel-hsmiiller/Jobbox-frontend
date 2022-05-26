import { ISignupDto } from "../interfaces/auth/signup-dto";

export class SignupDto implements ISignupDto {
    private _name: string;
    private _surname: string;
    private _email: string;
    private _password: string;
    private _birthDate: Date;

    constructor(body: any) {
        this._name = body.name;
        this._surname = body.surname;
        this._email = body.email;
        this._password = body.password;
        this._birthDate = body.birthDate;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get surnane(): string {
        return this._surname;
    }
    public set surname(value: string) {
        this._surname = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get birthDate(): Date {
        return this._birthDate;
    }
    public set birthDate(value: Date) {
        this._birthDate = value;
    }
}
