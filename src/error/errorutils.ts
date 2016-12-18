export class ErrorUtils {
  static getStackTrace() {
    let e = new Error();
    return e.stack;
  }
}
