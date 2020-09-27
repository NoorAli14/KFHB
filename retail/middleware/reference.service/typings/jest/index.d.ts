export {};
declare global {
  namespace jest {
    // required for expect(expected).toBeRandomId()
    interface Matchers<R> {
      toBeValid(errors: any): object;
    }
    // required for { id: expect.toBeRandomId() }
    interface Expect {
      toBeValid(errors: any): object;
    }
  }
}
