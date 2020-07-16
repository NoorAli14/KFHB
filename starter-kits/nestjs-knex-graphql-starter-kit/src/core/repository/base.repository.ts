import { InjectKnex, Knex } from 'nestjs-knex';
export abstract class BaseRepository {
  @InjectKnex() private readonly _connection: Knex;
  private _tableName: string;
  constructor(tableName) {
    this._tableName = tableName;
  }
  get connection(): Knex {
    return this._connection;
  }
  async list() {
    return this._connection(this._tableName);
  }
  async create(newObj): Promise<any> {
    return this._connection(this._tableName).insert(newObj, '*');
  }
  async update(condition, newObj): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .update(newObj, '*');
  }
  async delete(condition): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .del();
  }
  async findBy(condition: Object): Promise<any> {
    return this._connection(this._tableName).where(condition);
  }
  async findOne(condition: Object): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .first();
  }
}
