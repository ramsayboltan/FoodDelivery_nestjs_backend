import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/app/users/users.service';
export declare class TokenAuthGuard implements CanActivate {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
