export interface AccessToken {
    userId: string;
    userType: string;
    metadata?: {[key: string]: any};
}