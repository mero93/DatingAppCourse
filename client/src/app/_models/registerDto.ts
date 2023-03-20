export class RegisterDto {
    public constructor(init?: Partial<RegisterDto>) {
        Object.assign(this, init)
    }   
    gender: string;
    username: string;
    knownAs: string ;
    dateOfBirth: Date;
    city: string;
    country: string;
    password: string;
}