import 'knex';

declare module 'knex' {
  export interface QueryBuilder<TRecord extends {} = any, TResult = any> {
    _statements: any[];
  }
}
