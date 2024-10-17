export class ConfigHelper {

    static getAccessTokenSecret(userType: string) {
        return `${process.env[`JWT_${userType.toUpperCase()}_ACCESS_TOKEN_SECRET_KEY`] }`
    }

    static getAccessTokenExpiration(userType: string) {
        return `${process.env[`JWT_${userType.toUpperCase()}_ACCESS_TOKEN_EXPIRATION`] }`
    }

    static getRefreshTokenSecret(userType: string) {
        return `${process.env[`JWT_${userType.toUpperCase()}_REFRESH_TOKEN_SECRET_KEY`] }`
    }

    static getRefreshTokenExpiration(userType: string) {
        return `${process.env[`JWT_${userType.toUpperCase()}_REFRESH_TOKEN_EXPIRATION`] }`
    }
}