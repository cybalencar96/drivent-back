export default class UnauthorizedError extends Error {
  constructor() {
    super("Você deve estar conectado para continuar");

    this.name = "UnauthorizedError";
  }
}
