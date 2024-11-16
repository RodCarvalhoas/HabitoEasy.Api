import { Test, TestingModule } from "@nestjs/testing";
import { PinoLogger } from "nestjs-pino"
import RequestEnding from "src/infra/exceptions/RequestEnding";
import { UserTokenGateway } from "src/scopes/authentication/gateways/userToken/userToken.gateway"
import { RefreshTokenUseCase } from "src/scopes/authentication/useCases/refreshToken/refreshToken.usecase";
import { RefreshTokenUseCaseInput } from "src/scopes/authentication/useCases/refreshToken/refreshToken.usecase.input";
import { RefreshTokenUseCaseValidator } from "src/scopes/authentication/useCases/refreshToken/refreshToken.usecase.validator"

const refreshTokenInput: RefreshTokenUseCaseInput = {
    refreshToken: 'refreshTokenInput'
}

const [accessToken, refreshToken] = ['accessToken', 'refreshToken'];

describe('RefreshToken UseCase', () => {
    let logger: PinoLogger;
    let validator: RefreshTokenUseCaseValidator;
    let userTokenGateway: UserTokenGateway;
    let refreshTokenUseCase: RefreshTokenUseCase;

    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshTokenUseCase,
                RefreshTokenUseCaseValidator,
                {
                    provide: UserTokenGateway,
                    useValue: {
                        handleRefreshToken: jest.fn().mockResolvedValue([accessToken, refreshToken])
                    }
                },
                {
                    provide: PinoLogger,
                    useValue: {
                        info: jest.fn()
                    }
                }
            ]
        }).compile()
        
        logger = testModule.get(PinoLogger);
        validator = testModule.get(RefreshTokenUseCaseValidator)
        userTokenGateway = testModule.get(UserTokenGateway)
        refreshTokenUseCase = testModule.get(RefreshTokenUseCase)
    })

    it('Should be defined', () => {
        expect(logger).toBeDefined()
        expect(validator).toBeDefined()
        expect(userTokenGateway).toBeDefined()
        expect(refreshTokenUseCase).toBeDefined()
    })

    it('Should return a refreshToken with successfully', async () => {
        const result = await refreshTokenUseCase.execute(refreshTokenInput);

        expect(result).toEqual({accessToken: accessToken, refreshToken: refreshToken});
        expect(userTokenGateway.handleRefreshToken).toHaveBeenCalledTimes(1);
    })

    it('Should throw a Request Ending exception', async () => {
        const refreshTokenInputMissingValue = {refreshToken: ''}

        const result = refreshTokenUseCase.execute(refreshTokenInputMissingValue);

        await expect(result).rejects.toThrow(RequestEnding);
        expect(userTokenGateway.handleRefreshToken).toHaveBeenCalledTimes(0);
    })
})