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

  async list(keys: string | string[], condition?: Record<string, any>): Promise<any> {
    const query = this._connection(this._tableName).select(keys);
    if(condition)
      return query.where(condition);
    return query
  }

  async create(newObj: Record<string, any>, keys: string[]): Promise<any> {
    return this._connection(this._tableName).insert(newObj, keys);
  }

  async update(
    condition: Record<string, any>,
    newObj: Record<string, any>,
    keys: string[],
  ): Promise<any> {
    return this._connection(this._tableName)
        .where(condition)
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
}
