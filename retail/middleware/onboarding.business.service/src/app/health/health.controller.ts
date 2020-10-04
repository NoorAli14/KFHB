import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  DNSHealthIndicator,
  HealthCheckService,
  HealthCheck,
} from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistryService } from '@common/services/registry.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dns: DNSHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly registry: RegistryService
  ) { }

  @Get()
  @HealthCheck()
  @ApiResponse({ status: 200, description: 'Health status of the service' })
  healthCheck(): Promise<any> {
    const promises = [async (): Promise<any> => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024), async (): Promise<any> => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024)]
    const _promises = this.registry.services.map(service => {
      const host_name: string = `${service.is_secure ? 'https' : 'http'}://${service.host_name}:${service.port
        }/api/v1/health`;
      return async (): Promise<any> => this.dns.pingCheck(service.name, host_name)
    })
    //Health indicator executes a check of a service, whether it is in a healthy or unhealthy state
    return this.health.check([..._promises, ...promises]);
  }
}
