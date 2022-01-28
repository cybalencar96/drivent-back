import dayjs from "dayjs";
import User from "@/entities/User";
import Event from "@/entities/Event";

import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import Setting from "@/entities/Setting";
import InvalidDataError from "@/errors/InvalidData";
import ConflictError from "@/errors/ConflictError";

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
    User.findOne({ id: userId }),
    Event.findOne({ id: eventId })]);

  if(!userFound || !eventFound) throw new InvalidDataError("Invalid data provided", []);
  for (const event of userFound.events) {
    if (event.id === eventId) throw new ConflictError("Already registered");
  }

  userFound.events.push(eventFound);
  User.save(userFound);
  return userFound;
}

export async function listUserEvents(userId: number) {
  const userFound = await User.findOne({ id: userId });
  if(!userFound) throw new InvalidDataError("Data provided does not match any", []);

  return userFound.events;
}
