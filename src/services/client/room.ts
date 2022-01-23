import Room from "@/entities/Room";
import Reservation from "@/entities/Reservation";

async function getRoomsFromHotel(hotelId: number) {
  return await Room.find({
    where: {
      hotelId,
    },
  });
}

async function getOnlyAvailableRoomsFromHotel(hotelId: number) {
  const allRooms = await Room.find({
    where: {
      hotelId,
    },
  });

  const whereArray = allRooms.map((room) => ({ roomId: room.id }));
  const reservationsFound = await Reservation.find({ where: whereArray });
  return allRooms.filter(
    (room) =>
      !reservationsFound.find((reservation) => reservation.roomId === room.id)
  );
}

async function getRoomDetailsFromHotel(hotelId: number) {
  const rooms = await Room.find({ where: { hotelId } });
  return Promise.all(rooms.map((room) => room.getRoomInfo()));
}

export default {
  getRoomsFromHotel,
  getOnlyAvailableRoomsFromHotel,
  getRoomDetailsFromHotel,
};
