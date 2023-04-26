import { CreateUserDto } from './createUser.dto';
export declare class AuthService {
    private readonly users;
    hashPassword(password: string): Promise<string>;
    validateEmail: (email: any) => RegExpMatchArray;
    checkEmail(email: string): Promise<boolean>;
    checkUsername(username: string): Promise<boolean>;
    create(user: CreateUserDto): Promise<CreateUserDto>;
    findAll(): Promise<CreateUserDto[]>;
}
