import { InjectKnex, Knex } from 'nestjs-knex';
import {QueryBuilder} from "knex";
import {PaginationParams, SortingParam} from "@common/classes";
import {NUMBERS} from "@common/constants";
import {ENT_PaginationModel} from "@common/models";
export abstract class BaseRepository {
  @InjectKnex() protected readonly _connection: Knex;
  protected _tableName: string;
  protected _timestamps: boolean;

  constructor(tableName: string, timestamps=true) {
    this._tableName = tableName;
    this._timestamps = timestamps;
  }

  get connection(): Knex {
    return this._connection;
  }

  get tableName(): string {
    return this._tableName;
  }

  async listWithPagination(
      countQuery: QueryBuilder,
      dataQuery: QueryBuilder,
      paginationParams: PaginationParams,
      sortingParams: SortingParam,
      output: string[]): Promise<any> {
    if(sortingParams?.field){
      dataQuery = dataQuery.orderBy(sortingParams.field, sortingParams.direction);
    } else {
      dataQuery = dataQuery.orderBy("created_on", "desc");
    }
    const limitPerPage = (paginationParams?.limit || NUMBERS.DEFAULT_PAGE_SIZE) > NUMBERS.DEFAULT_PAGE_SIZE ?
        NUMBERS.DEFAULT_PAGE_SIZE :
        (paginationParams?.limit || NUMBERS.DEFAULT_PAGE_SIZE);
    const page = Math.max(paginationParams?.page || 1, 1);
    const offset = (page - 1) * limitPerPage;
    const total = await countQuery.count('id as count').first();
    const rows = await dataQuery.offset(offset).limit(limitPerPage).select(output);
    const count = parseInt(String(total.count), 10);
    const pagination: ENT_PaginationModel = {
      total: count,
      pages: Math.ceil(count / limitPerPage),
      pageSize: limitPerPage,
      page: page,
    };
    return { pagination: pagination, data: rows };
  }

  async listWithoutPagination(
      keys: string | string[],
      condition?: Record<string, any>): Promise<any> {
    const query = this._connection(this._tableName).select(keys).orderBy('created_on', 'desc');
    if(condition)
      return query.where(condition);
    return query
  }

  async create(newObj: Record<string, any>, keys: string[]): Promise<any> {
    return this._connection(this._tableName).insert(newObj, keys);
  }

  async update(
    condition: Record<string, any>,
    input: Record<string, any>,
    output: string[],
  ): Promise<any> {
    if (this._timestamps) input.updated_on = this._connection.fn.now();
    return this._connection(this._tableName)
        .where(condition)
        .update(input, output);
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

  async markAsDelete(tenant_id: string, current_user_id: string, record_id: string): Promise<any> {
    const condition = {
      id: record_id,
      tenant_id: tenant_id
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
