import { Injectable } from '@nestjs/common';
export interface iSERVICE {
  baseURL?: string;
  timeout?: number;
  maxRedirects?: number;
}

@Injectable()
export class ServiceRegistry {
  // Default values just for testing, These values comes through service registry
  get(service: string): iSERVICE {
    return {
      baseURL: 'http://localhost:4000',
      timeout: 5000,
      maxRedirects: 5,
    };
  }
}
