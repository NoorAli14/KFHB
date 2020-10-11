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
        application: this.configService.IDENTITYX.APPLICATION,
        reg_policy: this.configService.IDENTITYX.REG_POLICY,
        evaluation_policy: this.configService.IDENTITYX.EVALUATION_POLICY,
      },
    });
    // this.__enableInterceptors();
  }

  private __enableInterceptors() {
    // Request interceptor for API calls
    this.__identity.interceptors.request.use(
      async config => {
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    // Response interceptor for API calls
    this.__identity.interceptors.response.use(
      response => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          return this.__identity.request(originalRequest);
        }
        return Promise.reject(error);
      },
    );
  }

  async createUser(userId: string): Promise<any> {
    this.logger.log(`Identity User Create with [${userId}] ID`);
    return this.__identity.users.create({
      data: { userId: userId },
    });
  }

  async createCheckId(userId: string, referenceId: string): Promise<any> {
    this.logger.log(`Creating Check ID with daon User ${userId}`);
    return this.__identity.idChecks(userId).create({
      data: { referenceId: referenceId },
    });
  }

  async findUserById(userId: string): Promise<any> {
    this.logger.log(`Find target user with ID [${userId}]`);
    return this.__identity.users.findById(userId);
  }
  async createRegistrationChallenge(reference_id: string): Promise<any> {
    this.logger.log(
      `Creating Registration Challenge with Reference ID: ${reference_id}`,
    );
    return this.__identity.registrationChallenge.create({
      data: { reference_id },
    });
  }

  async updateRegistrationChallenge(
    request_id: string,
    input: { [key: string]: string },
  ): Promise<any> {
    this.logger.log(
      `Updating Registration Challenge with Request ID: ${request_id}`,
    );
    return this.__identity.registrationChallenge.update({
      params: { fido_registration_request_id: request_id },
      data: { fidoRegistrationResponse: input.file },
    });
  }

  async createLiveness(
    userId: string,
    checkId: string,
    input: { [key: string]: string },
  ): Promise<any> {
    this.logger.log(`Uploading Liveness of User ID: ${userId}`);
    return this.__identity.faces(userId, checkId).liveness({
      data: input,
    });
  }

  async getLivenessImage(
    userId: string,
    checkId: string,
    livenessId: string,
  ): Promise<any> {
    this.logger.log(`Uploading Liveness of User ID: ${userId}`);
    return this.__identity.faces(userId, checkId).getLivenessSensitiveData({
      params: { id: livenessId },
    });
  }
  async createDocument(
    userId: string,
    checkId: string,
    input: { [key: string]: string },
  ): Promise<any> {
    this.logger.log(` uploading document with daon User ${userId}`);
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

  async getDocument(
    userId: string,
    checkId: string,
    documentId: string,
  ): Promise<any> {
    this.logger.log(`Get document with ID ${documentId}`);
    return this.__identity.documents(userId, checkId).getDocument(documentId);
  }

  async getServerProcessedOCRSensitiveData(
    userId: string,
    checkId: string,
    documentId: string,
  ): Promise<any> {
    this.logger.log(`Get document Processed Data with ID ${documentId}`);
    return this.__identity
      .documents(userId, checkId)
      .getServerProcessedOCRSensitiveData(documentId);
  }

  async getProcessedClientImage(
    userId: string,
    checkId: string,
    documentId: string,
  ) {
    this.logger.log(`Get document processed Image with ID ${documentId}`);
    return this.__identity
      .documents(userId, checkId)
      .getProcessedClientImage(documentId);
  }

  async getExtractedClientImage(
    userId: string,
    checkId: string,
    documentId: string,
  ) {
    this.logger.log(`Get document extracted Image with ID ${documentId}`);
    return this.__identity
      .documents(userId, checkId)
      .getExtractedClientImage(documentId);
  }
  async createEvaluation(userId: string, checkId: string): Promise<any> {
    this.logger.log(`Creating evaluation with User ID ${userId}`);
    return this.__identity.evaluation(userId, checkId).create();
  }

  sanitize(keys: { [key: string]: any }): { [key: string]: any } {
    let data = {};
    for (var key in keys) {
      if (keys.hasOwnProperty(key)) {
        data[keys[key].name] = keys[key].value;
      }
    }
    return data;
  }
}
