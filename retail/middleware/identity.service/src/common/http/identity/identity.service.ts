import Identity from 'identity-api';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigurationService } from '@rubix/common/configuration/configuration.service';

@Injectable()
export class IdentityService {
  private readonly __identity: Identity;
  constructor(private readonly configService: ConfigurationService) {
    this.__identity = new Identity({
      apiBase: this.configService.IDENTITYX.BASE_URL,
      apiVersion: this.configService.IDENTITYX.VERSION,
      maxNetworkRetries: 1,
      auth: {
        token: this.configService.IDENTITYX.TOKEN,
        username: this.configService.IDENTITYX.USERNAME,
        password: this.configService.IDENTITYX.PASSWORD,
      },
      config: {
        tenant: this.configService.IDENTITYX.TENANT,
      },
    });
  }

  async createUser(userId: string): Promise<any> {
    Logger.log(`Identity User Create with ${userId} ID`);
    return this.__identity.users.create({
      data: { userId: userId },
    });
  }

  async createCheckId(userId: string): Promise<any> {
    Logger.log(`Create Check ID with daon User ${userId}`);
    return this.__identity.idChecks(userId).create({
      data: { referenceId: userId },
    });
  }
}
