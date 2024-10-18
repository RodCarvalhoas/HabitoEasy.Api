import { Observable } from 'rxjs';

import {
    CanActivate, ExecutionContext, Injectable, InternalServerErrorException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AuthenticationMetadata from './authenticationMetadata';
import { AccessToken } from 'src/scopes/authentication/gateways/userToken/interfaces/accessToken';

@Injectable()
export class UserTypeGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const authenticationMetadata = this.reflector.get<AuthenticationMetadata>('authenticationMetadata', context.getHandler()) as AuthenticationMetadata;
        const userTypes = authenticationMetadata.userTypes;
        if (!userTypes)
            throw new InternalServerErrorException();

        const request = context.switchToHttp().getRequest();
        const user: AccessToken = request.user;

        if (authenticationMetadata.optional && !user)
            return true;

        return userTypes.includes(user.userType);
    }
}
