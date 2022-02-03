import ConflictError from "./ConflictError";

export default class ExistingReservationError extends ConflictError {
  constructor() {
    super("O usuário já fez uma reserva");

    this.name = "ExistingReservation";
  }
}
