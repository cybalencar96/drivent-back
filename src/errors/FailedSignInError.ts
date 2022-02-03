export default class FailedSignInError extends Error {
    details: string[] = [];
    constructor() {
      super("Não autorizado");

      this.details.push("E-mail ou senha inválidos!");
      this.name = "UnauthorizedError";
    }
}
