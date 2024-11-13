import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { HttpStatus } from '@nestjs/common';
import { AuthenticationUser } from "src/scopes/authentication/commands/entities/authenticationUser.entity";
import SecurityHelper from "src/scopes/authentication/helpers/SecurityHelper";
import { AuthenticationUseCaseInput } from "src/scopes/authentication/useCases/authentication/authentication.usecase.input";
import { AuthenticationUseCase } from "src/scopes/authentication/useCases/authentication/authentication.usecase";
import { AuthenticationUserCommandRepository } from 'src/scopes/authentication/commands/repositories/authenticationUser/authenticationUser.command.repository';
import { UserTokenGateway } from 'src/scopes/authentication/gateways/userToken/userToken.gateway';
import RequestEnding from 'src/infra/exceptions/RequestEnding';
import { AuthenticationUseCaseValidator } from "src/scopes/authentication/useCases/authentication/authentication.usecase.validator";


const authenticationUser: AuthenticationUser = {
    id: randomUUID(),
    userType: 'DEFAULT_USER',
    name: 'teste',
    email: 'teste@teste.com.br',
    password: SecurityHelper.HashPassword('12345678'),
    createdAt: new Date(),
    updatedAt: new Date()
}

const userInput: AuthenticationUseCaseInput = {
    email: authenticationUser.email,
    password: '12345678'
}

const [acessToken, refreshToken] = ['accessToken', 'refreshToken'];

describe('Authentication Usecase', () => {
    let authenticationUseCase: AuthenticationUseCase;
    let logger: PinoLogger;
    let validator: AuthenticationUseCaseValidator;
    let authenticationUserCommandRepository: AuthenticationUserCommandRepository;
    let tokenGateway: UserTokenGateway;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [
                AuthenticationUseCase,
                AuthenticationUseCaseValidator,
                {
                    provide: AuthenticationUserCommandRepository,
                    useValue: {
                        findByEmail: jest.fn().mockResolvedValue(authenticationUser)
                    }
                },
                {
                    provide: UserTokenGateway,
                    useValue: {
                        generateTokens: jest.fn().mockResolvedValue([acessToken, refreshToken])
                    }
                },
                {
                    provide: PinoLogger,
                    useValue: {
                        info: jest.fn()
                    }
                }
            ]
        }).compile();

        authenticationUseCase = testModule.get<AuthenticationUseCase>(AuthenticationUseCase);
        logger = testModule.get<PinoLogger>(PinoLogger);
        validator = testModule.get<AuthenticationUseCaseValidator>(AuthenticationUseCaseValidator);
        authenticationUserCommandRepository = testModule.get<AuthenticationUserCommandRepository>(AuthenticationUserCommandRepository);
        tokenGateway = testModule.get<UserTokenGateway>(UserTokenGateway);
    })

    it('Should be defined', () => {
        expect(authenticationUseCase).toBeDefined();
        expect(authenticationUserCommandRepository).toBeDefined();
        expect(tokenGateway).toBeDefined();
        expect(logger).toBeDefined();
        expect(validator).toBeDefined();
    })

    it('Should authenticate a user with successfully', async () => {
        const result = await authenticationUseCase.execute(userInput);
        
        expect(result.accessToken).toEqual(acessToken);
        expect(result.refreshToken).toEqual(refreshToken);
        expect(authenticationUserCommandRepository.findByEmail).toHaveBeenCalledTimes(1);
    })

    it('When authenticationUseCase started with missing data then return an validation Error', async () => {
        const userInputWithoutPassword = {...userInput};
        userInputWithoutPassword.password = '';

        const result = authenticationUseCase.execute(userInputWithoutPassword);

        await expect(result).rejects.toThrow(new RequestEnding(HttpStatus.BAD_REQUEST));
        expect(authenticationUserCommandRepository.findByEmail).toHaveBeenCalledTimes(0);
        expect(tokenGateway.generateTokens).toHaveBeenCalledTimes(0);
    })

    it('When authenticationUseCase started and an User is not found, then return an Forbidden', async () => {
        jest.spyOn(authenticationUserCommandRepository, 'findByEmail').mockResolvedValueOnce(null);

        const result = authenticationUseCase.execute(userInput);

        await expect(result).rejects.toThrow(new RequestEnding(HttpStatus.FORBIDDEN));
        expect(authenticationUserCommandRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(tokenGateway.generateTokens).toHaveBeenCalledTimes(0);
    })

    it('When authenticationUseCase started with send a wrong password, then return an Forbidden', async () => {
        const userInputWithWrongPassword = {...userInput};
        userInputWithWrongPassword.password = 'senhaErrada';

        const result = authenticationUseCase.execute(userInputWithWrongPassword);

        await expect(result).rejects.toThrow(new RequestEnding(HttpStatus.FORBIDDEN));
        expect(authenticationUserCommandRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(tokenGateway.generateTokens).toHaveBeenCalledTimes(0);
    })
})