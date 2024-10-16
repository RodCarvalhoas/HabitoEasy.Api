import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import RequestEnding from './RequestEnding';
import RequestEndingBody from './RequestEndingBody';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private logger = new PinoLogger({ renameContext: AllExceptionsFilter.name });

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let httpStatus: HttpStatus;
        let exceptionBody: any;

        if (exception instanceof RequestEnding) {
            httpStatus = exception.getStatus();
            exceptionBody = exception.getResponse();
            this.logMessage(exception);
        } else if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
            exceptionBody = exception.getResponse();
            this.logMessage(exception);
        } else {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            exceptionBody = {
                statusCode: httpStatus,
                message: 'Internal Server Error',
            };
            this.logger.error(`Internal Server Error: ${exception}`);
        }

        response.status(httpStatus).json(exceptionBody?.returnedData || exceptionBody);
    }

    private logMessage(exception: RequestEnding) {
        const responseBody = exception?.getResponse() as RequestEndingBody;
        if (!!responseBody) {
            this.logger.warn(`Ending request early, reason: ${JSON.stringify(responseBody)}`);
        }
    }
}