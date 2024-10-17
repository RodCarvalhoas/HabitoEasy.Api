import { AuthenticationUserRepository } from './../../repositories/authenticationUser/authenticationUser.repository';
import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { AuthenticationUser } from "../../entities/authenticationUser.entity";
import { AccessToken } from './interfaces/accessToken';
import { decode, sign, verify } from 'jsonwebtoken';
import { ConfigHelper } from 'src/scopes/authentication/helpers/ConfigHelper';
import { RefreshToken } from './interfaces/refreshToken';

@Injectable()
export class UserTokenGateway {
    constructor(
        private readonly logger: PinoLogger
    ){}

    async generateTokens(user: AuthenticationUser, tokenMetadata?: string): Promise<[string, string]> {
        this.logger.info(`Generate Tokens started for User with email: ${user.email}`)

        const accessToken = this.generateAccessToken(user, tokenMetadata);
        const refreshToken = this.generateRefreshToken(user);

        this.logger.info(`Successfully on generate tokens!`)
        return [accessToken, refreshToken];
    }

    private generateAccessToken(user: AuthenticationUser, tokenMetadata?: string): string {
        let metadataObject: { [key: string]: any } = { ...tokenMetadata ? JSON.parse(tokenMetadata) : undefined };
    
        const payload: AccessToken = {
            userId: user.id,
            userType: user.userType,
            metadata: metadataObject
        }

        return sign(
            payload,
            ConfigHelper.getAccessTokenSecret(user.userType),
            { expiresIn: `${ConfigHelper.getAccessTokenExpiration(user.userType)}m` }
        );
    }

    private generateRefreshToken(user: AuthenticationUser): string {
        const payload: RefreshToken = {
            userId: user.id,
            userType: user.userType
        }

        return sign(
            payload,
            ConfigHelper.getRefreshTokenSecret(user.userType),
            { expiresIn: `${ConfigHelper.getRefreshTokenExpiration(user.userType)}m` }
        );
    }
}