import ConflictError from "./ConflictError";

export default class ExistingReservationError extends ConflictError {
  constructor() {
    super("User has already made a reservation");

    this.name = "ExistingReservation";
  }
}
