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
  }
  async create(newObj: {[key: string]: any}, keys: string[]): Promise<any> {
    return this._connection(this._tableName).insert(newObj, keys);
  }
  async update(
    condition: {[key: string]: any},
    newObj: {[key: string]: any},
    columns?: string[],
  ): Promise<any> {
    return this.connection(this.tableName)
      .where(condition)
      .update(newObj, columns);
  }
  async delete(condition: {[key: string]: any}): Promise<any> {
    return this.connection(this.tableName)
      .where(condition)
      .del();
  }
  async findBy(condition: {[key: string]: any}, columns?: string[]): Promise<any> {
    return this.connection(this.tableName)
      .select(columns)
      .where(condition);
  }
  async findOne(condition: {[key: string]: any}, columns?: string[]): Promise<any> {
    return this.connection(this.tableName)
      .select(columns)
      .where(condition)
      .first();
  }
}
