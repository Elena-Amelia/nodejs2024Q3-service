import { ConsoleLogger, Injectable } from '@nestjs/common';
import 'dotenv/config'

@Injectable()
export class LoggerService extends ConsoleLogger {
   logLevel: number;
  constructor() {
    super();
    this.logLevel =
      parseInt(process.env.LOG_LEVEL, 10) >= 0
        ? parseInt(process.env.LOG_LEVEL, 10)
        : 5;
  }

  logOutLogs(...data) {
    console.log(...data);
  }

  logReq(request: any, response: any) {
    if (this.logLevel >= 0) {
      console.log(`Request: ${request.method} ${request.url}`);
      console.log(`Query Parameters: ${JSON.stringify(request.query)}`);
      console.log(`Body: ${JSON.stringify(request.body)}`);
      console.log(`Response: ${JSON.stringify(response)}`);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.logLevel >= 2) {
      this.logOutLogs(message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (this.logLevel >= 0) {
      this.logOutLogs(message, ...optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.logLevel >= 1) {
      this.logOutLogs(message, ...optionalParams);
    }
  }

  debug(message: any, ...optionalParams: any[]) {
    if (this.logLevel >= 3) {
      this.logOutLogs(message, ...optionalParams);
    }
  }

  verbose(message: any, ...optionalParams: any[]) {
    if (this.logLevel >= 4) {
      this.logOutLogs(message, ...optionalParams);
    }
  }
}