import Room from "@/entities/Room";
import Reservation from "@/entities/Reservation";
import ExistingReservationError from "@/errors/ExistingReservation";
import NumberOfReservationsExceededError from "@/errors/NumberOfReservationsExceeded";
import roomTypes from "@/enums/roomTypes";
import User from "@/entities/User";

async function getRoomsFromHotel(hotelId: number) {
  return await Room.find({
    hotel: { id: hotelId },
  });
}

async function getOnlyAvailableRoomsFromHotel(hotelId: number) {
  const allRooms = await getRoomDetailsFromHotel(hotelId);
  return allRooms.reduce((acc, el) => acc + el.totalBeds - el.occupiedBeds, 0);
}

async function getRoomDetailsFromHotel(hotelId: number) {
  const rooms = await Room.find({ hotel: { id: hotelId } });
  return Promise.all(rooms.map((room) => room.getRoomInfo()));
}

async function reserveRoom(userId: number, roomId: number) {
  const user = await User.findOne({ id: userId });
  const userReservation = await Reservation.findOne({ user });

  if (userReservation) {
    throw new ExistingReservationError();
  }

  const room = await Room.getRoomById(roomId);
  const totalBedsInRoom = roomTypes[room.type.name];
  const roomReservations = await Reservation.find({ room: { id: roomId } });
  if (roomReservations.length === totalBedsInRoom) {
    throw new NumberOfReservationsExceededError();
  }

  const newReservation = Reservation.create({ user, room });
  await Reservation.save(newReservation);
  return newReservation.getReservation();
}

export default {
  getRoomsFromHotel,
  getOnlyAvailableRoomsFromHotel,
  getRoomDetailsFromHotel,
  reserveRoom,
};
