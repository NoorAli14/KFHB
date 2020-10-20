import { InjectKnex, Knex } from 'nestjs-knex';
import { NUMBERS } from "@rubix/common";
import { IDT_PaginationModel } from "@common/models";
import { QueryParams } from "@common/classes";
import { QueryBuilder } from "knex";

export abstract class BaseRepository {
  @InjectKnex() private readonly _connection: Knex;
  private _tableName: string;

  async listWithPagination(query_count: QueryBuilder,
    query_data: QueryBuilder,
    query_params: QueryParams): Promise<any> {
    const limitPerPage = (query_params.limit || NUMBERS.DEFAULT_PAGE_SIZE) > NUMBERS.MAX_PAGE_SIZE ?
      NUMBERS.MAX_PAGE_SIZE :
      (query_params.limit || NUMBERS.DEFAULT_PAGE_SIZE);
    const page = Math.max(query_params.page || 1, 1);
    const offset = (page - 1) * limitPerPage;
    const total = await query_count.count('id as count').first();
    const rows = await query_data.offset(offset).limit(limitPerPage).orderBy('created_on', 'desc');
    const count = parseInt(String(total.count), 10);
    const pages = Math.ceil(count / limitPerPage);
    const pagination: IDT_PaginationModel = {
      total: count,
      pages: pages,
      perPage: limitPerPage,
      current: page,
      next: page + 1 > pages ? null : page + 1,
      prev: page - 1 < 1 ? null : page - 1,
      isFirst: page == 1,
      isLast: page == pages,
    };
    return { pagination: pagination, data: rows };
  }

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
    let qb = this._connection(this._tableName).select(columns);
    if (limit) {
      qb = qb.limit(limit);
    }
    return qb;
  }

  async create(newObj: { [key: string]: any }, keys: string[], trx?: any) {
    const _knex: any = trx || this.connection;
    return _knex(this._tableName).insert(newObj).returning(keys);
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
      ).returning(columns);
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
