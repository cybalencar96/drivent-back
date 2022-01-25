import { Room, Reservation } from "@/entities";

async function getUserReservations(userId: number) {
  const reservationsFoundDirty = await Reservation.find({
    where: {
      user: { id: userId },
    },
    relations: [ "room", "user" ],
  });
  const sanitizedReservationsFound = reservationsFoundDirty.map(reservation => {
    delete reservation.user;
    return reservation;
  });
  return sanitizedReservationsFound;
}

async function getRoomReservationsAmount(roomId: number) {
  const reservationsFound = await Reservation.find({
    where: {
      room: { id: roomId },
    },
  });

  return { ammount: reservationsFound.length };
}

export default {
  getUserReservations,
  getRoomReservationsAmount,
};
