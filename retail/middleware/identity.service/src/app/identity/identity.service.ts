import Identity from 'identity-api';
import { Injectable, Logger } from '@nestjs/common';
import { generateRandomString } from '@rubix/common/utilities';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';

@Injectable()
export class IdentityService {
  private readonly __identity: Identity;
  constructor(private readonly configService: ConfigurationService) {
    this.__identity = new Identity({
      apiBase: 'https://aionuatserver.uaenorth.cloudapp.azure.com:8443',
      apiVersion: 'v1',
      maxNetworkRetries: 1,
      auth: {
        username: 'aionadmin',
        password: 'A!iondigital123',
      },
      config: {
        tenant: 'kfhk-test',
      },
    });
  }
}