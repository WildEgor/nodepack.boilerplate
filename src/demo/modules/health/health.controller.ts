import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiHealth } from './api/health.api';

@Controller({
  path: 'health',
})
@UsePipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
}))
export class HealthController {

  constructor(
    private readonly healthService: HealthService,
  ) {
  }

  @ApiHealth()
  @Get('health')
  public async health() {
    return await this.healthService.check();
  };

}
