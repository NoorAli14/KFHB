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
  async list(columns: string[], limit?: number): Promise<any> {
    const qb = this._connection(this._tableName).select(columns);
    if(limit) {
      qb.limit(limit)
    }
    return qb;
  }
  async create(newObj: Record<string, any>, keys: string[]): Promise<any> {
    return this._connection(this._tableName).insert(newObj, keys);
  }
  async update(
    condition: Record<string, any>,
    newObj: Record<string, any>,
    keys?: string[],
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
