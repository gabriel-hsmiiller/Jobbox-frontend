export interface EncodedUser {
    id: number;
    email: string;
    name: string;
    surname: string;
    image: string | ArrayBuffer;
    phone: string;
    isConfirmed: boolean;
}
