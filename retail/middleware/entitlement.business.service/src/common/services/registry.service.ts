import { Injectable, Logger } from '@nestjs/common';
import { GQL_SERVICES } from '@volume/registry.service';
export interface iSERVICE_CONNECTION {
  baseURL?: string;
  timeout?: number;
  maxRedirects?: number;
}

@Injectable()
export class RegistryService {
  private readonly logger: Logger = new Logger(RegistryService.name);
  private __services;

  constructor() {
    this.__services = GQL_SERVICES.map(service => ({
      ...service,
      url: this.formatUrl(service),
    }));
  }
  // Default values just for testing, These values comes through service registry
  get(name: string) {
    return this.__services.find((service) => service.name === name);
  }

  get services(): any {
    return this.__services;
  }

  formatUrl(service) {
    return `${service.is_secure ? 'https' : 'http'}://localhost:${service.port
      }${service.context}`;
  }
}
