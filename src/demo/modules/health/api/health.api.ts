import { applyDecorators, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

export const ApiHealth = (): MethodDecorator => applyDecorators(
  HealthCheck,
  Version('1'),
  HttpCode(HttpStatus.OK),
);
