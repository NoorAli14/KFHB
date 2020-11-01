import { InjectKnex, Knex } from 'nestjs-knex';
import { NUMBERS } from "@rubix/common";
import { IDT_PaginationModel } from "@common/models";
import {PaginationParams, SortingParam} from "@common/dtos";
import { QueryBuilder } from "knex";

export abstract class BaseRepository {
  @InjectKnex() private readonly _connection: Knex;
  private _tableName: string;

  async listWithPagination(
      countQuery : QueryBuilder,
      dataQuery: QueryBuilder,
      paginationParams: PaginationParams,
      sortingParams: SortingParam,
      output: string[]): Promise<any> {
    if(sortingParams?.sort_by){
      dataQuery = dataQuery.orderBy(sortingParams.sort_by, sortingParams.sort_order);
    } else {
      dataQuery = dataQuery.orderBy("created_on", "desc");
    }
    const limitPerPage = (paginationParams?.limit || NUMBERS.DEFAULT_PAGE_SIZE) > NUMBERS.MAX_PAGE_SIZE ?
      NUMBERS.MAX_PAGE_SIZE :
      (paginationParams?.limit || NUMBERS.DEFAULT_PAGE_SIZE);
    const page = Math.max(paginationParams?.page || 1, 1);
    const offset = (page - 1) * limitPerPage;
    const total = await countQuery.count('id as count').first();
    const rows = await dataQuery.offset(offset).limit(limitPerPage).select(output);
    const count = parseInt(String(total.count), 10);
    const pagination: IDT_PaginationModel = {
      total: count,
      pages: Math.ceil(count / limitPerPage),
      pageSize: limitPerPage,
      page: page,
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
