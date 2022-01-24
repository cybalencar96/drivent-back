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

export default {
  getUserReservations,
};
