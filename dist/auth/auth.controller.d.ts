import { CreateUserDto } from './createUser.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    create(createUserDto: CreateUserDto): Promise<{
        description: string;
        data: any;
    }>;
    findAll(): Promise<{
        description: string;
        data: any;
    }>;
}
