export function createQueryObject(input: { [key: string]: any }): string {
  return JSON.stringify(input).replace(/\"([^(\")"]+)\":/g, '$1:');
}

export function createQuery(
  method: string,
  input: { [key: string]: any },
  returnkeys: string,
): string {
  const result = `
    mutation {
      ${method}(appointment: ${createQueryObject(input)}) {
       ${returnkeys}
      }
    }`;
  return result;
}
