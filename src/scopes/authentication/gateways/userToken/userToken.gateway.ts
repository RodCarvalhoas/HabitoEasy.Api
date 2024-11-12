import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";
import { AuthenticationUser } from "../../commands/entities/authenticationUser.entity";
import { AccessToken } from './interfaces/accessToken';
import { sign, decode, verify } from 'jsonwebtoken';
import { ConfigHelper } from 'src/scopes/authentication/helpers/ConfigHelper';
import { RefreshToken } from './interfaces/refreshToken';
import { AuthenticationUserCommandRepository } from "../../commands/repositories/authenticationUser/authenticationUser.command.repository";

@Injectable()
export class UserTokenGateway {
    constructor(
        private readonly logger: PinoLogger,
        private readonly authenticationUserRepository: AuthenticationUserCommandRepository
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

    async handleRefreshToken(refreshToken: string): Promise<[string, string]> {
        const refreshTokenDecoded = this.getRefreshToken(refreshToken);

        const user = await this.authenticationUserRepository.findById(refreshTokenDecoded.userId);
        if (user == null)
            throw new UnauthorizedException();

        return await this.generateTokens(user);
    }

    private getRefreshToken(refreshToken: string) {
        try {
            const decodedToken = decode(refreshToken, { complete: true });
            const payload = decodedToken.payload as RefreshToken;
            const token = verify(refreshToken, ConfigHelper.getRefreshTokenSecret(payload.userType)) as RefreshToken;
            if (!token)
                throw new UnauthorizedException();

            return token;
        } catch(e) {
            this.logger.warn(e, 'Unexpected error while trying to validate refresh token');
            throw new UnauthorizedException();
        }
    }
}