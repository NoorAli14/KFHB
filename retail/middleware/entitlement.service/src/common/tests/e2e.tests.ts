export function createPayloadObject(input: { [key: string]: any }): string {
  return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
}

export function createMutationQuery(
  method: string,
  input: { [key: string]: any },
  return_keys: string,
): string {
  let result = `
    mutation {
      ${method}(input: ${createPayloadObject(input)}) {
       ${return_keys}
      }
    }`;
    console.log("Mutaion is..................................")
    console.log("Mutaion is..................................")
    console.log("Mutaion is..................................")
    console.log(result);
    return result;
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
