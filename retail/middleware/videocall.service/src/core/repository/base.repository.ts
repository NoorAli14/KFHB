import { InjectKnex, Knex } from 'nestjs-knex';
export abstract class BaseRepository {
  @InjectKnex() protected readonly _connection: Knex;
  protected _tableName: string;
  constructor(tableName: string) {
    this._tableName = tableName;
  }
  get connection(): Knex {
    return this._connection;
  }
  get tableName(): string {
    return this._tableName;
  }
  async list(keys?: string | string[]): Promise<any> {
    return this._connection(this._tableName).select(keys);
  }

  async create(newObj: { [key: string]: any }, keys: string[], trx?: any) {
    const _knex: any = trx || this.connection;
    return _knex(this._tableName)
      .insert(newObj)
      .returning(keys);
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
      .update({ ...newObj, ...{ updated_on: this.connection.fn.now() } })
      .returning(columns);
  }

  async updateByIds(
    ids: string[],
    newObj: Record<string, any>,
    keys?: string[],
  ): Promise<any> {
    return this._connection(this._tableName)
      .whereIn('id', ids)
      .update(newObj, keys);
  }

  async delete(condition: Record<string, any>): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .del();
  }
  async findBy(condition: Record<string, any>, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .where(condition);
  }
  async findOne(condition: Record<string, any>, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .where(condition)
      .first();
  }

  async findByIds(
    ids: readonly string[],
    keys?: string[],
    sort_according_to_ids = false,
  ): Promise<any> {
    const result: any[] = await this._connection(this._tableName)
      .select(keys)
      .whereIn('id', ids);

    if (sort_according_to_ids) {
      return result.sort(function(a, b) {
        return ids.indexOf(a.id) - ids.indexOf(b.id);
      });
    }
    return result;
  }

  async between(
    column_name: string,
    start: string | Date | any,
    end: string | Date | any,
    keys?: string[],
  ): Promise<any[]> {
    return this._connection(this._tableName)
      .select(keys)
      .where(column_name, '>=', start)
      .where(column_name, '<', end);
  }

  async transaction(): Promise<any> {
    const trxProvider = this._connection.transactionProvider();
    const trx = await trxProvider();
    return trx;
  }
}
