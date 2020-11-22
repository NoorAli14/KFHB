import { InjectKnex, Knex } from 'nestjs-knex';
import { QueryBuilder } from 'knex';
import { ENT_PaginationModel } from '@common/models';
export abstract class BaseRepository {
  @InjectKnex() protected readonly _connection: Knex;
  protected _tableName: string;
  protected _timestamps: boolean;

  constructor(tableName: string, timestamps = true) {
    this._tableName = tableName;
    this._timestamps = timestamps;
  }

  get connection(): Knex {
    return this._connection;
  }

  get tableName(): string {
    return this._tableName;
  }

  paginate(
    dataQuery: QueryBuilder,
    countQuery: QueryBuilder,
    page_no: number | undefined,
    limit: number | undefined,
    output: string[],
  ): Promise<any> {
    const limitPerPage = pageSize(limit);
    const page = Math.max(page_no || 1, 1);
    const offset = (page - 1) * limitPerPage;
    return Promise.all([
      countQuery.count('id as count').first(),
      dataQuery
        .offset(offset)
        .limit(limitPerPage)
        .select(output),
    ]).then(([total, rows]) => {
      const count = parseInt(String(total['count']), 10);
      const pagination: ENT_PaginationModel = {
        total: count,
        pages: Math.ceil(count / limitPerPage),
        pageSize: limitPerPage,
        page: page,
      };
      return { pagination: pagination, data: rows };
    });
  }

  listWithoutPagination(
    keys: string | string[],
    condition?: Record<string, any>,
  ): Promise<any> {
    const query = this._connection(this._tableName)
      .select(keys)
      .orderBy('created_on', 'desc');
    if (condition) return query.where(condition);
    return query;
  }

  create(newObj: Record<string, any>, keys: string[]): Promise<any> {
    return this._connection(this._tableName).insert(newObj, keys);
  }

  update(
    condition: Record<string, any>,
    input: Record<string, any>,
    output: string[],
  ): Promise<any> {
    if (this._timestamps) input.updated_on = this._connection.fn.now();
    return this._connection(this._tableName)
      .where(condition)
      .update(input, output);
  }

  delete(condition: Record<string, any>): Promise<any> {
    return this._connection(this._tableName)
      .where(condition)
      .del();
  }

  findBy(condition: Record<string, any>, keys?: string[]): any {
    return this._connection(this._tableName)
      .select(keys)
      .where(condition);
  }

  findOne(condition: Record<string, any>, keys?: string[]): Promise<any> {
    return this._connection(this._tableName)
      .select(keys)
      .where(condition)
      .first();
  }

  markAsDelete(
    tenant_id: string,
    current_user_id: string,
    record_id: string,
    entity_id?: string,
  ): Promise<any> {
    const condition = {
      id: record_id,
      tenant_id: tenant_id,
      entity_id: entity_id || null
    };
    const input = {
      deleted_on: this._connection.fn.now(),
      deleted_by: current_user_id,
      updated_on: this._connection.fn.now(),
      updated_by: current_user_id,
    };
    return this.update(condition, input, ['id']);
  }
}

/**
 * pageSize number
 * @param pageSize
 */
const pageSize = (pageSize: number): number => {
  if (!pageSize || pageSize < 1)
    return parseInt(process.env.ENV_RBX_PAGINATION_PAGE_SIZE) || 25;
  if (pageSize && pageSize > 100) return 100;
  return pageSize;
};
