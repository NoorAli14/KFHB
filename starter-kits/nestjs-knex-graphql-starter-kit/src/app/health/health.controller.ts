import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  DNSHealthIndicator,
HealthCheckService,
HealthCheck
} from '@nestjs/terminus';
import {
  Controller,
  Get
  } from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dns: DNSHealthIndicator,
    private readonly memory: MemoryHealthIndicator
  ) { }

  @Get()
  @HealthCheck()
  @ApiResponse({ status: 200,     
  description: 'Health status of the service',
 })
  healthCheck() {
    return this.health.check([
      async () => this.dns.pingCheck('google', 'https://google.com'),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
    ]);
  }
}
