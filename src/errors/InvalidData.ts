export default class InvalidDataError extends Error {
  details: string[];

  constructor(name: string, details: string[]) {
    super(`${name} inválido`);

    this.details = details;
    this.name = "InvalidDataError";
  }
}
