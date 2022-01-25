export default class FailedSignInError extends Error {
    details: string[] = [];
    constructor() {
      super("Unauthorized");

      this.details.push("email or password invalid!");
      this.name = "UnauthorizedError";
    }
}
