import { IRecoveryPassword } from "../interfaces/auth/recovery-password";

export class RecoveryPasswordDto implements IRecoveryPassword {
    private _email: string;
    private _newPassword: string;
    private _recoveryPasswordToken: string;

    constructor(body: any) {
        this._email = body.email;
        this._newPassword = body.newPassword;
        this._recoveryPasswordToken = body.recoveryPasswordToken
    }

    public get newPassword(): string {
        return this._newPassword;
    }
    public set newPassword(value: string) {
        this._newPassword = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get recoveryPasswordToken(): string {
        return this._recoveryPasswordToken;
    }
    public set recoveryPasswordToken(value: string) {
        this._recoveryPasswordToken = value;
    }
}
