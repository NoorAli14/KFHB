import { Injectable, Logger } from '@nestjs/common';
import {GqlClientService, PAGINATION_OUTPUT, toGraphql} from '@common/index';
import {SALPaginationList, SystemAuditLog} from "./system-audit-log.entity";
import {SystemAuditLogDTO} from "./system-audit-log";

@Injectable()
export class SystemAuditLogService {
  private readonly logger: Logger = new Logger(SystemAuditLogService.name);

  private readonly __output: string = `{
    id
    user_id
    tenant_id
    audit_code
    audit_text
    created_by
    created_on
  }`;

  constructor(private readonly gqlClient: GqlClientService) { }

  async create(input: SystemAuditLogDTO): Promise<SystemAuditLog> {
    this.logger.log(`Creating a new system audit log`);
    const mutation = `mutation {
      result: addSystemAuditLog(input: ${toGraphql(input)}) ${this.__output}
    }`;
    return this.gqlClient.send(mutation);
  }

  async list(params?: any): Promise<SALPaginationList> {
    this.logger.log(`Start fetching list of all system audit logs`);
    const query = `query {
      result: systemAuditLogList(
        filters: ${toGraphql(params?.filters)}
        sort_by: ${toGraphql(params?.sort_by)}
        pagination: ${toGraphql(params?.pagination)}
      ) {
        pagination ${PAGINATION_OUTPUT}
        data ${this.__output}
      }
    }`;
    return this.gqlClient.send(query);
  }
}
