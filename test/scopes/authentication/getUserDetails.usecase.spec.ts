import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";
import { PinoLogger } from "nestjs-pino";
import { AuthenticationUserQueryRepository } from "src/scopes/authentication/queries/repositories/authentication/authenticationUser.query.repository";
import { AuthenticationUserSchema } from "src/scopes/authentication/queries/schemas/authenticationUser.schema";
import { GetUserDetailsUseCase } from "src/scopes/authentication/useCases/getUserDetails/getUserDetails.usecase";
import { GetUserDetailsUseCaseInput } from "src/scopes/authentication/useCases/getUserDetails/getUserDetails.usecase.input";
import { GetUserDetailsUseCaseOutput } from "src/scopes/authentication/useCases/getUserDetails/getUserDetails.usecase.output";
import { GetUserDetailsValidator } from "src/scopes/authentication/useCases/getUserDetails/getUserDetails.usecase.validator";

const authenticationUserSchema: AuthenticationUserSchema = {
    _id: randomUUID(),
    name: 'teste2',
    email: 'teste2@teste.com.br',
}

const getUserDetailsInput: GetUserDetailsUseCaseInput = {
    userId: authenticationUserSchema._id
}

const getUserDetailsOutput: GetUserDetailsUseCaseOutput = {
    email: authenticationUserSchema.email,
    name: authenticationUserSchema.name
}

describe('GetUserDetails UseCase', () => {
    let getUserDetailsUseCase: GetUserDetailsUseCase;
    let logger: PinoLogger;
    let validator: GetUserDetailsValidator;
    let authenticationUserQueryRepository: AuthenticationUserQueryRepository;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [
                GetUserDetailsUseCase,
                GetUserDetailsValidator,
                {
                    provide: AuthenticationUserQueryRepository,
                    useValue: {
                        findById: jest.fn().mockResolvedValue(authenticationUserSchema)
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

        getUserDetailsUseCase = testModule.get<GetUserDetailsUseCase>(GetUserDetailsUseCase);
        logger = testModule.get<PinoLogger>(PinoLogger);
        validator = testModule.get<GetUserDetailsValidator>(GetUserDetailsValidator);
        authenticationUserQueryRepository = testModule.get<AuthenticationUserQueryRepository>(AuthenticationUserQueryRepository);
    })

    it('Should be defined', () => {
        expect(getUserDetailsUseCase).toBeDefined();
        expect(authenticationUserQueryRepository).toBeDefined();
        expect(logger).toBeDefined();
        expect(validator).toBeDefined();
    })

    it('Should return a user details with successfully', async () => {
        const result = await getUserDetailsUseCase.execute(getUserDetailsInput);

        expect(result).toMatchObject<GetUserDetailsUseCaseOutput>(getUserDetailsOutput);
        expect(authenticationUserQueryRepository.findById).toHaveBeenCalledTimes(1);
    })

    it('Should return a NotFoundException', async () => {
        jest.spyOn(authenticationUserQueryRepository, 'findById').mockResolvedValueOnce(null);

        const result = getUserDetailsUseCase.execute(getUserDetailsInput);

        await expect(result).rejects.toThrow(NotFoundException);
        expect(authenticationUserQueryRepository.findById).toHaveBeenCalledTimes(1);
    })
})