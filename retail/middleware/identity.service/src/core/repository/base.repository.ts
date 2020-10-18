import { InjectKnex, Knex } from 'nestjs-knex';
import {IQueryParams, NUMBERS} from "@rubix/common";
import {PaginationModel} from "@common/models";

export abstract class BaseRepository {
  @InjectKnex() private readonly _connection: Knex;
  private _tableName: string;

  constructor(tableName: string) {
    this._tableName = tableName;
  }

  async listWithPagination(queryParams: IQueryParams,
                           keys: string | string[],
                           condition?: Record<string, any>): Promise<any> {
    const perPage = queryParams.limit;
    const currentPage = queryParams.page;
    const pagination: PaginationModel = {};
    const limitPerPage = (perPage || NUMBERS.DEFAULT_PAGE_SIZE) > 100 ? 100 : (perPage || NUMBERS.DEFAULT_PAGE_SIZE);
    const page = Math.max(currentPage || 1, 1);
    const offset = (page - 1) * limitPerPage;
    const total = condition?
      await this._connection(this._tableName).where(condition).count('id as count').first():
      await this._connection(this._tableName).count('id as count').first();
    const rows = condition?
      await this._connection(this._tableName).where(condition).offset(offset).limit(limitPerPage).orderBy('created_on', 'desc'):
      await this._connection(this._tableName).offset(offset).limit(limitPerPage).orderBy('created_on', 'desc');
    const count = parseInt(String(total.count), 10);
    pagination.total = count;
    pagination.pages = Math.ceil(count / limitPerPage);
    pagination.perPage = limitPerPage;
    pagination.current = page;
    pagination.next = page + 1 > pagination.pages ? null : page + 1;
    pagination.prev = page - 1 < 1 ? null : page - 1;
    pagination.isFirst = pagination.current == 1;
    pagination.isLast = pagination.current == pagination.pages;
    return {pagination: pagination, data: rows};
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
