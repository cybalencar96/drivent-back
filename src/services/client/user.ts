import dayjs from "dayjs";
import User from "@/entities/User";
import Event from "@/entities/Event";
import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import Setting from "@/entities/Setting";
import InvalidDataError from "@/errors/InvalidData";
import ConflictError from "@/errors/ConflictError";
import NumberOfReservationsExceededError from "@/errors/NumberOfReservationsExceeded";
import { dateOperator } from "@/adapters/DateOperatorAdapter";

export async function createNewUser(email: string, password: string) {
  const settings = await Setting.getEventSettings();

  if (dayjs().isBefore(dayjs(settings.startDate))) {
    throw new CannotEnrollBeforeStartDateError();
  }

  const user = await User.createNew(email, password);
  return user;
}

export async function signToEvent(userId: number, eventId: number) {
  const [userFound, eventFound] = await Promise.all([
    User.findOne({ where: { id: userId }, relations: ["events"] }),
    Event.findOne({ where: { id: eventId }, relations: ["users"] })
  ]);

  if(!userFound || !eventFound) throw new InvalidDataError("Invalid data provided", []);
  
  for (const event of userFound.events) {
    if (event.id === eventId) throw new ConflictError("Already registered");

    if (
      dateOperator.isAfterOrSame(eventFound.startDate, event.startDate) &&
      dateOperator.isBeforeOrSame(eventFound.startDate, event.endDate) ||
      dateOperator.isAfterOrSame(eventFound.endDate, event.startDate) &&
      dateOperator.isBeforeOrSame(eventFound.endDate, event.endDate) ||
      dateOperator.isAfterOrSame(eventFound.endDate, event.endDate) &&
      dateOperator.isBeforeOrSame(eventFound.startDate, event.startDate)
    ) {
      throw new ConflictError(`
        Time Overlap Error:
        You are registered at event ${event.name}
        that overlaps time with the event you're trying to sign  
      `);
    }
  }

  if (eventFound.users.length >= eventFound.vacancies) throw new NumberOfReservationsExceededError();

  userFound.events.push(eventFound);
  User.save(userFound);

  const newEventSigned = userFound.events[userFound.events.length - 1];
  return {
    user: userFound.structureToClient(),
    event: newEventSigned.structureToClient(),
  };
}

export async function listUserEvents(userId: number) {
  const userFound = await User.findOne({ where: { id: userId }, relations: ["events"] });
  if(!userFound) throw new InvalidDataError("Data provided does not match any", []);

  return userFound.events;
}

export async function listAllEvents() {
  const events = await Event.find();
  return events;
}
