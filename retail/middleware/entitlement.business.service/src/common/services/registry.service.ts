import { Injectable } from '@nestjs/common';
export interface iSERVICE_CONNECTION {
  baseURL?: string;
  timeout?: number;
  maxRedirects?: number;
}

export interface iSERVICE {
  name: string,
  url: string
}

@Injectable()
export class RegistryService {
  // Default values just for testing, These values comes through service registry
  get(service: string): iSERVICE_CONNECTION {
    return {
      baseURL: 'http://localhost:5000',
      timeout: 5000,
      maxRedirects: 5,
    };
  }

  services(service: string): iSERVICE[] {
    if (process.env.NODE_ENV === 'production') {
      return [
        { name: 'users', url: 'http://user_management_service:5020/graphql' },
        { name: 'notifications', url: 'http://notification_service:5030/graphql' },
      ];
    }
    return [
      { name: 'users', url: 'http://localhost:5020/graphql' },
      { name: 'notifications', url: 'http://localhost:5030/graphql' },
    ];
  }
}
