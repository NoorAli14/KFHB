import { InjectKnex, Knex } from 'nestjs-knex';
import {PaginationModel} from '@common/models';
import {NUMBERS, PAGINATION_PARAMS} from '@common/constants';
export abstract class BaseRepository {
  @InjectKnex() protected readonly _connection: Knex;
  protected _tableName: string;

  constructor(tableName: string) {
    this._tableName = tableName;
  }

  get connection(): Knex {
    return this._connection;
  }

  async listWithPagination(paginationParams: Record<string, any>,
                           keys: string | string[],
                           condition?: Record<string, any>): Promise<any> {
    const perPage = parseInt(String(paginationParams[PAGINATION_PARAMS.PER_PAGE]), 10);
    const currentPage = parseInt(String(paginationParams[PAGINATION_PARAMS.PAGE]), 10);
    const pagination: PaginationModel = {};
    const limitPerPage = perPage || NUMBERS.DEFAULT_PAGE_SIZE;
    const page = Math.max(currentPage || 1, 1);
    const offset = (page - 1) * limitPerPage;
    const total = condition?
      await this._connection(this._tableName).where(condition).count('id as count').first():
      await this._connection(this._tableName).count('id as count').first();
    const rows = condition?
      await this._connection(this._tableName).where(condition).offset(offset).limit(limitPerPage).orderBy('created_on', 'desc'):
      await this._connection(this._tableName).offset(offset).limit(limitPerPage).orderBy('created_on', 'desc');
    const count = parseInt(String(total.count), 10);
    pagination.from= offset;
    pagination.to = offset + rows.length;
    pagination.total = count;
    pagination.perPage = limitPerPage;
    pagination.currentPage = page;
    pagination.lastPage = Math.ceil(count / limitPerPage);
    pagination.offset = offset;
    return {pagination: pagination, data: rows};
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
