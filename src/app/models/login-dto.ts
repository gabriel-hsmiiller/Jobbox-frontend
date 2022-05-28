import { ILoginDto } from "../interfaces/auth/login-dto";

export class LoginDto implements ILoginDto {
    private _email: string;
    private _password: string;

    constructor(body: any) {
        this._email = body.email;
        this._password = body.password;
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
}
