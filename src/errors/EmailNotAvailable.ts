import ConflictError from "@/errors/ConflictError";

export default class EmailNotAvailableError extends Error {
  details: string[] = [];
  constructor(email: string) {
    super(`Email "${email}" is being used by another user!`);

    this.details.push(`Email "${email}" is being used by another user!`);
    this.name = "EmailNotAvailableError";
  }
}
