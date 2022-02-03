import ConflictError from "./ConflictError";

export default class NumberOfReservationsExceededError extends ConflictError {
  constructor() {
    super("este quarto não tem mais camas livres");

    this.name = "NumberOfReservationsExceeded";
  }
}
