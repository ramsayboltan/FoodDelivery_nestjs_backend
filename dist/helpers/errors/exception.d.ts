import { ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
export declare class MyHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
