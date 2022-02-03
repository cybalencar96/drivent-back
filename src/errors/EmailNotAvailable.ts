import ConflictError from "@/errors/ConflictError";

export default class EmailNotAvailableError extends Error {
  details: string[] = [];
  constructor(email: string) {
    super(`E-mail "${email}" está sendo usado por outro usuário!`);

    this.details.push(`E-mail "${email}" está sendo usado por outro usuário!`);
    this.name = "EmailNotAvailableError";
  }
}
