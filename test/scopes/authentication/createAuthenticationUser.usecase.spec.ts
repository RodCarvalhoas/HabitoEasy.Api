import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from 'nestjs-pino';
import { randomUUID } from 'crypto';
import { ConflictException } from '@nestjs/common';
import { AuthenticationUser } from "src/scopes/authentication/commands/entities/authenticationUser.entity";
import SecurityHelper from "src/scopes/authentication/helpers/SecurityHelper";
import { AuthenticationUserCommandRepository } from 'src/scopes/authentication/commands/repositories/authenticationUser/authenticationUser.command.repository';
import { UserTokenGateway } from 'src/scopes/authentication/gateways/userToken/userToken.gateway';
import RequestEnding from 'src/infra/exceptions/RequestEnding';
import { AuthenticationUseCaseValidator } from "src/scopes/authentication/useCases/authentication/authentication.usecase.validator";
import { CreateAuthenticationUserUseCase } from "src/scopes/authentication/useCases/createAuthenticationUser/createAuthenticationUser.usecase";
import { CreateAuthenticationUserUseCaseInput } from "src/scopes/authentication/useCases/createAuthenticationUser/createAuthenticationUser.usecase.input";
import { EventPublisher } from "src/scopes/event/services/publisher/eventPublisher";
import { CreateAuthenticationUserValidator } from "src/scopes/authentication/useCases/createAuthenticationUser/createAuthentcationUser.usecase.validator";

const authenticationUser: AuthenticationUser = {
    id: randomUUID(),
    userType: 'DEFAULT_USER',
    name: 'teste2',
    email: 'teste2@teste.com.br',
    password: SecurityHelper.HashPassword('12345678'),
    createdAt: new Date(),
    updatedAt: new Date()
}

const createUserInput: CreateAuthenticationUserUseCaseInput = {
    name: 'teste',
    email: 'teste@teste.com.br',
    password: '12345678'
}

const [acessToken, refreshToken] = ['accessToken', 'refreshToken'];

describe('CreateAuthenticationUser Usecase', () => {
    let createAuthenticationUserUseCase: CreateAuthenticationUserUseCase;
    let logger: PinoLogger;
    let validator: CreateAuthenticationUserValidator;
    let authenticationUserCommandRepository: AuthenticationUserCommandRepository;
    let tokenGateway: UserTokenGateway;
    let eventPublisher: EventPublisher;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAuthenticationUserUseCase,
                CreateAuthenticationUserValidator,
                {
                    provide: AuthenticationUserCommandRepository,
                    useValue: {
                        findByEmail: jest.fn().mockResolvedValue(null),
                        create: jest.fn().mockResolvedValue(authenticationUser)
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
                },
                {
                    provide: EventPublisher,
                    useValue: {
                        publish: jest.fn()
                    }
                }
            ]
        }).compile();

        createAuthenticationUserUseCase = testModule.get<CreateAuthenticationUserUseCase>(CreateAuthenticationUserUseCase);
        logger = testModule.get<PinoLogger>(PinoLogger);
        validator = testModule.get<AuthenticationUseCaseValidator>(CreateAuthenticationUserValidator);
        authenticationUserCommandRepository = testModule.get<AuthenticationUserCommandRepository>(AuthenticationUserCommandRepository);
        tokenGateway = testModule.get<UserTokenGateway>(UserTokenGateway);
        eventPublisher = testModule.get<EventPublisher>(EventPublisher);
    })

    it('Should be defined', () => {
        expect(createAuthenticationUserUseCase).toBeDefined();
        expect(authenticationUserCommandRepository).toBeDefined();
        expect(tokenGateway).toBeDefined();
        expect(logger).toBeDefined();
        expect(validator).toBeDefined();
    })

    it('Should create a user with successfully', async () => {
        const result = await createAuthenticationUserUseCase.execute(createUserInput);
        
        expect(result.accessToken).toEqual(acessToken);
        expect(result.refreshToken).toEqual(refreshToken);
        expect(authenticationUserCommandRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(authenticationUserCommandRepository.create).toHaveBeenCalledTimes(1);
        expect(eventPublisher.publish).toHaveBeenCalledTimes(1);
    })

    it('Should return a conflict exception', async () => {
        jest.spyOn(authenticationUserCommandRepository, 'findByEmail').mockResolvedValueOnce(authenticationUser);

        const result = createAuthenticationUserUseCase.execute(createUserInput);
        
        await expect(result).rejects.toThrow(new ConflictException());
        expect(authenticationUserCommandRepository.findByEmail).toHaveBeenCalledTimes(1);
        expect(authenticationUserCommandRepository.create).toHaveBeenCalledTimes(0);
        expect(eventPublisher.publish).toHaveBeenCalledTimes(0);
    })

    it('Should return a Request Ending exception', async () => {
        const inputMissingValue = {...createUserInput, password: undefined}

        const result = createAuthenticationUserUseCase.execute(inputMissingValue);
        
        await expect(result).rejects.toThrow(RequestEnding);
        expect(authenticationUserCommandRepository.findByEmail).toHaveBeenCalledTimes(0);
        expect(authenticationUserCommandRepository.create).toHaveBeenCalledTimes(0);
        expect(eventPublisher.publish).toHaveBeenCalledTimes(0);
    })
})