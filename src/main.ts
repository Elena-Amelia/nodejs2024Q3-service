import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as yaml from 'yamljs';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { CatchEverythingFilter } from './exception-filter/all-exception-filter';
import { LoggerService } from './logger/logger.service';

const DEFAULT_PORT = 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new LoggerService();
  const doc: OpenAPIObject = yaml.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, doc);

  app.useLogger(logger);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapter, logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = process.env.PORT || DEFAULT_PORT;
  await app.listen(PORT);
  logger.log('Server started on port ${PORT}');

  process.on('uncaughtException', (reason) => {
    logger.log('uncaughtException');
    logger.error(reason);
    throw reason;
  });

  process.on('unhandledRejection', (reason) => {
    logger.log('unhandledRejection');
    logger.error(reason);
  });
}
bootstrap();
