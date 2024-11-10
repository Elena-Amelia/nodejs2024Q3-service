import { NestFactory} from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as yaml from 'yamljs';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const doc: OpenAPIObject = yaml.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, doc);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
