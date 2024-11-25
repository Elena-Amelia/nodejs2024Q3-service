import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}
  use(req: Request, res: Response, next: () => void) {
    const { method, baseUrl, query, body } = req;

    res.on('finish', () => {
      const response = {
        statusCode: res.statusCode,
        message: res.statusMessage,
      };
      this.loggerService.logReq({ method, url: baseUrl, query, body }, response);
    });
    next();
  }
}
