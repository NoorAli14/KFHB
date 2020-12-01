import { InjectKnex, Knex } from 'nestjs-knex';
import { IDT_PaginationModel } from "@common/models";
import { QueryBuilder } from "knex";

export abstract class BaseRepository {
  @InjectKnex() private readonly _connection: Knex;
  private _tableName: string;

  paginate(
    dataQuery: QueryBuilder,
    countQuery: QueryBuilder,
    page_no: number | undefined,
    limit: number | undefined,
    output: string[]): Promise<any> {
    const limitPerPage = pageSize(limit);
    const page = Math.max(page_no || 1, 1);
    const offset = (page - 1) * limitPerPage;
    return Promise.all([
      countQuery.count('id as count').first(),
      dataQuery.offset(offset).limit(limitPerPage).select(output),
    ])
      .then(([total, rows]) => {
        const count = parseInt(String(total['count']), 10);
        const pagination: IDT_PaginationModel = {
          total: count,
          pages: Math.ceil(count / limitPerPage),
          pageSize: limitPerPage,
          page: page,
        };
        return { pagination: pagination, data: rows };
      })

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

/**
 * pageSize number
 * @param pageSize
 */
const pageSize = (pageSize: number): number => {
  if(!pageSize || pageSize < 1) return parseInt(process.env.ENV_RBX_PAGINATION_PAGE_SIZE) || 25;
  if(pageSize && pageSize > 100) return 100;
  return pageSize;
};
