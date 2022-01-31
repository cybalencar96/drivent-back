import ConflictError from "@/errors/ConflictError";

export default class CpfNotAvailableError extends Error {
  details: string[] = [];
  constructor(cpf: string) {
    super(`CPF "${cpf}" is being used by another user!`);
    this.details.push(`CPF "${cpf}" is being used by another user!`);
    this.name = "CpfNotAvailable";
  }
}
