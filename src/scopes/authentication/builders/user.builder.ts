import SecurityHelper from "src/scopes/authentication/helpers/SecurityHelper";
import { AuthenticationUser } from "../entities/authenticationUser.entity";

export default class UserBuilder {
    public static buildAuthenticationUser(type: string, name: string, email: string, password?: string): AuthenticationUser {
        const user = new AuthenticationUser();
        user.name = name;
        user.userType = type;
        user.email = email;
        if (password)
            user.password = SecurityHelper.HashPassword(password);
        return user;
    }
}   