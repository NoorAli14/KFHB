import { Injectable, Logger, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SESSION_STATUSES } from '@rubix/common';
import { SessionRepository, CustomerRepository } from '@rubix/core';
import { Session } from './session.model';
import { Customer } from '../customers/customer.model';

@Injectable({ scope: Scope.REQUEST })
export class SessionsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    // private readonly identityService: IdentityService,
    private readonly sessionDB: SessionRepository,
    private readonly customerDB: CustomerRepository,
  ) {
    console.log(request.headers);
  }

  async getCustomer(input): Promise<Customer> {
    const customer: any = await this.customerDB.findByIdAndTenentId(
      input.user.id,
      input.tenent_id,
    );
    return customer;
  }
  async create(
    input: { [key: string]: any },
    columns?: string[],
  ): Promise<Session> {
    const trx: any = await this.customerDB.transaction();
    try {
      console.log(input);
      const customer: Customer = await this.getCustomer(input);
      // const checkId: any = await this.identityService.createUser(
      //   customer.target_user_id,
      // );
      input = {
        ...input,
        ...{
          target_user_id: customer.target_user_id,
          // check_id: checkId.id,
          status: SESSION_STATUSES.ACTIVE,
        },
      };
      await this.sessionDB.update(
        { user_id: customer.id },
        { status: SESSION_STATUSES.ARCHIVED },
        ['id'],
        trx,
      );
      const [session] = await this.sessionDB.create(input, columns, trx);
      await this.customerDB.update({ session_id: session.id }, ['id'], trx),
        await trx.commit();
      return session;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}

// async delete(id: string): Promise<boolean> {
//   return await this.userDB.delete({ id });
// }
// }
