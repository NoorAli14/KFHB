import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  // public async findById(id: number, transaction?: Transaction): Promise<User> {
  //   return User.query(transaction).findById(id);
  // }
  // public async findByEmail(
  //   email: string,
  //   transaction?: Transaction,
  // ): Promise<User> {
  //   return User.query(transaction).findOne({ email });
  // }
  // public async isEmailAvailable(
  //   email: string,
  //   skipUserId?: number,
  //   transaction?: Transaction,
  // ): Promise<boolean> {
  //   let query = User.query(transaction)
  //     .count('id as count')
  //     .where({ email })
  //     .first();
  //   if (skipUserId) {
  //     query = query.where('id', '!=', skipUserId);
  //   }
  //   const result: any = await query;
  //   return Number(result.count) === 0;
  // }
  // public async update(model: IUser, transaction?: Transaction): Promise<User> {
  //   return User.query(transaction).updateAndFetchById(model.id, model as any);
  // }
}
