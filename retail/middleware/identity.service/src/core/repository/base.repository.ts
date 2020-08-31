import { InjectKnex, Knex } from 'nestjs-knex';

export abstract class BaseRepository {
  @InjectKnex() private readonly _connection: Knex;
  private _tableName: string;
  constructor(tableName: string) {
    this._tableName = tableName;
  }
  get tableName(): string {
    return this._tableName;
  }
  get connection(): Knex {
    return this._connection;
  }
  async findAll(columns: string[], limit?: number): Promise<any> {
    const qb = this._connection(this._tableName).select(columns);
    if (limit) {
      qb.limit(limit);
    }
    return qb.limit(10);
  }
  async create(newObj: { [key: string]: any }, keys: string[], trx?: any) {
    const _knex: any = trx || this.connection;
    return _knex(this._tableName).insert(newObj, keys);
  }
  async update(
    condition: { [key: string]: any },
    newObj: { [key: string]: any },
    columns?: string[],
    trx?: any,
  ) {
    const _knex: any = trx || this.connection;
    return _knex(this.tableName)
      .where(condition)
      .update(
        { ...newObj, ...{ updated_on: this.connection.fn.now() } },
        columns,
      );
  }
  async delete(condition: { [key: string]: any }): Promise<any> {
    return this.connection(this.tableName)
      .where(condition)
      .del();
  }
  async findBy(
    condition: { [key: string]: any },
    columns?: string[],
  ): Promise<any> {
    return this.connection(this.tableName)
      .select(columns)
      .where(condition);
  }
  async findOne(
    condition: { [key: string]: any },
    columns?: string[],
  ): Promise<any> {
    return this.connection(this.tableName)
      .select(columns)
      .where(condition)
      .first();
  }

  async transaction(): Promise<any> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    return trx;
  }
}
