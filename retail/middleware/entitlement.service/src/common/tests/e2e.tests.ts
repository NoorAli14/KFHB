import { KeyValInput } from '@common/inputs/key-val.input';
import { PaginationParams, SortingParam } from '@common/dtos';

export function createPayloadObject(input: { [key: string]: any }): string {
  return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
}

export function getMutation(
  method: string,
  input: { [key: string]: any },
  return_keys: string,
  id?: string,
): string {
  return id
    ? `mutation{
      ${method}(input:${createPayloadObject(input)},id:"${id}") {
       ${return_keys}
      }
    }`
    : `mutation{
      ${method}(input:${createPayloadObject(input)}) {
       ${return_keys}
      }
    }`;
}

export function getQuery(
  method: string,
  return_keys: string,
  id?: string,
): string {
  return id
    ? `query{
      ${method}(id:"${id}"){
       ${return_keys}
      }
    }`
    : `query{
      ${method}{
       ${return_keys}
      }
    }`;
}

export function getChecksQuery(
  method: string,
  checks: KeyValInput[],
  return_keys: string,
): string {
  const input = checks.map(check => createPayloadObject(check));
  return 'query{' + method + '(checks:' + input + '){' + return_keys + '}}';
}

export function getDeleteMutation(method: string, id: string): string {
  return `mutation{
      ${method}(id:"${id}")
    }`;
}

export function getListWithPaginationQuery(
  method: string,
  return_keys: string,
): string {
  const paginationParams: PaginationParams = {
    page: 1,
    limit: 25,
  };
  const filterParams = {};
  const sortingParam: SortingParam = {
    sort_by: 'created_on',
    sort_order: 'desc',
  };
  return `query{
    ${method}(
      pagination:${createPayloadObject(paginationParams)},
      filters:${createPayloadObject(filterParams)},
      sort_by:${createPayloadObject(sortingParam)}){
        pagination{
          total
          pages
          pageSize
          page
        }
        data{
          ${return_keys}
        }   
      }
    }`;
}
