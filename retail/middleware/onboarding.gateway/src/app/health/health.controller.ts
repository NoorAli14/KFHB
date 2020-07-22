import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  DNSHealthIndicator,
  HealthCheckService,
  HealthCheck,
} from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dns: DNSHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiResponse({ status: 200, description: 'Health status of the service' })
  healthCheck(): Promise<any> {
    //Health indicator executes a check of a service, whether it is in a healthy or unhealthy state
    return this.health.check([
      async (): Promise<any> =>
        // DNS health Checker. 
        this.dns.pingCheck('google', 'https://google.com'),
      async (): Promise<any> =>
        // RSS Memory health Checker.
        this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      async (): Promise<any> =>
        // Heap Memory health Checker.
        this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      // async (): Promise<any> =>
      // // Disk Space stoarge Checker.
      //   this.disk.checkStorage('storage', {
      //     threshold: 2 * 1024 * 1024 * 1024,
      //     path: '/',
      //   }),
    ]);
  }
}
