import { IEmailConfirmation } from "../interfaces/auth/email-confirmation";

export class EmailConfirmationDto implements IEmailConfirmation {
    private _email: string;
    private _confirmationToken: string;

    constructor(body: any) {
        this._email = body.email;
        this._confirmationToken = body.confirmationToken
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get confirmationToken(): string {
        return this._confirmationToken;
    }
    public set confirmationToken(value: string) {
        this._confirmationToken = value;
    }
}
