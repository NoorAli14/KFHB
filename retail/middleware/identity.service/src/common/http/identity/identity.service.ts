import Identity from 'identity-api';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigurationService } from '@rubix/common/configuration';
import { CURRENT_TIMESTAMP } from '@rubix/common';

@Injectable()
export class IdentityService {
  private readonly logger: Logger = new Logger(IdentityService.name);
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
    this.logger.log(`Identity User Create with ${userId} ID`);
    return this.__identity.users.create({
      data: { userId: userId },
    });
  }

  async createCheckId(userId: string, referenceId: string): Promise<any> {
    this.logger.log(`Create Check ID with daon User ${userId}`);
    return this.__identity.idChecks(userId).create({
      data: { referenceId: referenceId },
    });
  }

  async createDocument(
    userId: string,
    checkId: string,
    input: { [key: string]: string },
  ): Promise<any> {
    this.logger.log(`Create document with daon User ${userId}`);
    const params: { [key: string]: any } = {
      captured: CURRENT_TIMESTAMP(),
      clientCapture: {
        qualityScore: 0,
        processedImage: {
          sensitiveData: {
            imageFormat: 'JPG',
            value: input.file,
          },
        },
      },
    };
    if (input.unprocessedImage) {
      params.clientCapture['unprocessedImage'] = {
        sensitiveData: {
          imageFormat: 'JPG',
          value: input.unprocessedImage,
        },
      };
    }
    return this.__identity.documents(userId, checkId).create({
      data: params,
    });
  }
}
