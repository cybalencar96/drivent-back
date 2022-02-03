import ConflictError from "@/errors/ConflictError";

export default class CpfNotAvailableError extends Error {
  details: string[] = [];
  constructor(cpf: string) {
    super(`CPF "${cpf}" está sendo usado por outro usuário!`);
    this.details.push(`CPF "${cpf}" está sendo usado por outro usuário!`);
    this.name = "CpfNotAvailable";
  }
}
