import err = require('./err.json');
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const message = exception.message;
    console.log('--statusCode:', statusCode);

    if (statusCode < 1000) {
      response.status(400).json({
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    for (let i = 0; i < err.length; i++) {
      const element = err[i];
      //   message
      if (Number(Object.keys(element)[0]) === statusCode) {
        const message = element[Object.keys(element)[0]].message;

        response.status(400).json({
          statusCode,
          message: message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
    }
  }
}
