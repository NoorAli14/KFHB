export function createPayloadObject(input: { [key: string]: any }): string {
  return JSON.stringify(input);
}

export function createMutationQuery(
  method: string,
  input: { [key: string]: any },
  return_keys: string,
): string {
  return `
    mutation {
      ${method}(input: ${createPayloadObject(input)}) {
       ${return_keys}
      }
    }`;
}

export function createUpdateQuery(
  method: string,
  input: { [key: string]: any },
  id: string,
  return_keys: string,
): string {
  return `
    mutation {
      ${method}(input: ${createPayloadObject(input)}, id: ${id}) {
       ${return_keys}
      }
    }`;
}
