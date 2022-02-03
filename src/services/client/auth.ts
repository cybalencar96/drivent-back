import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";
import Enrollment from "@/entities/Enrollment";
import Ticket from "@/entities/Ticket";
import { Reservation } from "@/entities";
import FailedSignInError from "@/errors/FailedSignInError";

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new FailedSignInError();
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET
  );

  const session = await Session.createNew(user.id, token);

  const enroll = await Enrollment.find({ userId: user.id });

  const paid = await Ticket.findTicketByUserId(user.id);

  const reservation = await Reservation.findOne({
    where: { user: { id: user.id } },
    relations: ["room"],
  });

  let reservationsAmount = [];
  if (reservation) {
    reservationsAmount = await Reservation.find({
      where: {
        room: { id: reservation.room.id },
      },
    });
  }

  const reservationObject = { ...reservation, amount: reservationsAmount.length };

  return {
    user: {
      ...user.structureToClient(),
      events: user.events.map(event => event.structureToClient()) || [],
      paid: paid,
      enrolled: !!enroll[0],
      reservation: reservationObject,
    },

    token,
  };
}
