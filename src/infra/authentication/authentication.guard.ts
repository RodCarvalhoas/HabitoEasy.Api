import { decode, verify } from 'jsonwebtoken';
import { PinoLogger } from 'nestjs-pino';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AuthenticationMetadata from './authenticationMetadata';
import { AccessToken } from 'src/scopes/authentication/gateways/userToken/interfaces/accessToken';
import { ConfigHelper } from 'src/scopes/authentication/helpers/ConfigHelper';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private readonly logger: PinoLogger, private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationToken = request?.headers?.authorization?.replace('Bearer ', '');

        if (!authorizationToken) {
            const authenticationMetadata = this.reflector.get<AuthenticationMetadata>('authenticationMetadata', context.getHandler()) as AuthenticationMetadata;
            if (authenticationMetadata.optional)
                return true;

            this.logger.warn('Request sent without authorization header');
            throw new UnauthorizedException();
        }

        request.user = this.getUser(authorizationToken);
        return true;
    }

    private getUser = (accessToken: string): AccessToken => {
        try {
            const decodedToken = decode(accessToken, { complete: true });
            const payload = decodedToken.payload as AccessToken;
            const token = verify(accessToken, ConfigHelper.getAccessTokenSecret(payload.userType)) as AccessToken;
            if (!token)
                throw new UnauthorizedException();

            return token;
        } catch (error) {
            this.logger.warn(error, 'Unexpected error while trying to validate access token');
            throw new UnauthorizedException();
        }
    }
}