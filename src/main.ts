import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DemoModule } from './demo/demo.module';

const bootstrap = async(): Promise<void> => {
  const app = await NestFactory.create<NestFastifyApplication>(
    DemoModule,
    new FastifyAdapter(),
  );

  const logger = new Logger('Bootstrap');

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(logger);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nodepack Boilerplate - Common Nodepack Boilerplate')
    .addTag('doc.json')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT Authorization',
        description: 'Enter JWT access token for authorized requests.',
        in: 'header',
      },
      'JWT Token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(8080, '0.0.0.0', () => {
    const addr
      = 'win32' === process.platform
        ? 'http://localhost:8080'
        : 'http://127.0.0.1:8080';
    logger.debug(`Listening at ${addr}`);
  });
};
bootstrap()
  .catch(e => {
    throw e;
  });
