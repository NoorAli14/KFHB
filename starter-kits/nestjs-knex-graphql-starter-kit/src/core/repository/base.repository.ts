import { InjectKnex, Knex } from 'nestjs-knex';
export abstract class BaseRepository {
  @InjectKnex() private readonly _connection: Knex;
  private _tableName: string;
  constructor(tableName: string) {
    this._tableName = tableName;
  }
  get connection(): Knex {
    return this._connection;
  }
  async list(): Promise<any> {
    return this._connection(this._tableName);
  }
  async create(newObj: Record<string, any>): Promise<any> {
    return this._connection(this._tableName).insert(newObj, '*');
  }
  async update(
    condition: Record<string, any>,
    newObj: Record<string, any>,
  ): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .update(newObj, '*');
  }
  async delete(condition: Record<string, any>): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .del();
  }
  async findBy(condition: Record<string, any>): Promise<any> {
    return this._connection(this._tableName).where(condition);
  }
  async findOne(condition: Record<string, any>): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .first();
  }
}
