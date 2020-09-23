import { Injectable } from '@nestjs/common';
import { GQL_SERVICES } from '@volume/registry'
export interface iSERVICE_CONNECTION {
  baseURL?: string;
  timeout?: number;
  maxRedirects?: number;
}

export interface iSERVICE {
  name:string,
  url: string
}

@Injectable()
export class RegistryService {
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

  // services(service: string): iSERVICE[] {
  //   if (process.env.NODE_ENV === 'production') {
  //     return [
  //       { name: 'users', url: 'http://user_management_service:5020/graphql' },
  //       { name: 'notifications', url: 'http://notification_service:5030/graphql' },
  //     ];
  //   } 
  //   return [
  //     { name: 'users', url: 'http://localhost:5020/graphql' },
  //     { name: 'notifications', url: 'http://localhost:5030/graphql' },
  //   ];
  // }

  list() {
    console.log("RegistryService -> list -> this.__services", this.__services)
    return this.__services;
  }
  
  formatUrl(service) {
    return `${service.is_secure ? 'https' : 'http'}://${service.host_name}:${
      service.port
    }${service.context}`;
  }
}
