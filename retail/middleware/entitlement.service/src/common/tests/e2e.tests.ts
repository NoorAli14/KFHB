import {KeyValInput} from '@common/inputs/key-val.input';

export function createPayloadObject(input: { [key: string]: any }): string {
  return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
}

export function getMutation(
  method: string,
  input: { [key: string]: any },
  return_keys: string,
  id?: string,
): string {
  const result = id ?
    `mutation {
      ${method}(input: ${createPayloadObject(input)}, id: ${id}) {
       ${return_keys}
      }
    }`
    :
    `mutation {
      ${method}(input: ${createPayloadObject(input)}) {
       ${return_keys}
      }
    }`;
  // console.log("Mutation is..................................");
  // console.log(result);
  return result;
}

export function getQuery(
  method: string,
  return_keys: string,
  id?: string
): string {
  const result = id ?
    `query {
      ${method} (id: ${id}){
       ${return_keys}
      }
    }`
    :
    `query {
      ${method} {
       ${return_keys}
      }
    }`;
  // console.log("Query is..................................");
  // console.log(result);
  return result;
}

export function getChecksQuery(
  method: string,
  checks: KeyValInput[],
  return_keys: string,
): string {
  const result =
    `query {
      ${method} (checks: ${checks}){
       ${return_keys}
      }
    }`;
  // console.log("Checks Query is..................................");
  // console.log(result);
  return result;
}

export function getDeleteMutation(
  method: string,
  id: string,
): string {
  const result =
    `mutation {
      ${method} (id: ${id}){}
    }`;
  // console.log("Delete Mutation is..................................");
  // console.log(result);
  return result;
}
