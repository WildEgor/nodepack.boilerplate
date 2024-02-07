import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {

  private readonly logger: Logger;

  constructor(
  ) {
    this.logger = new Logger(HealthService.name);
  }

  public async check(): Promise<void> {
    this.logger.log('Health check');
  }
}
