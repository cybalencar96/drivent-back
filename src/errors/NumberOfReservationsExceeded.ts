import ConflictError from "./ConflictError";

export default class NumberOfReservationsExceededError extends ConflictError {
  constructor() {
    super("this room doesn't have free beds anymore");

    this.name = "NumberOfReservationsExceeded";
  }
}
