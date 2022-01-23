import Room from "@/entities/Room";
import Reservation from "@/entities/Reservation";

async function getRoomsFromHotel(hotelId: number) {
  return await Room.find({ where: {
    hotelId,
  } });
}

async function getOnlyAvailableRoomsFromHotel(hotelId: number) {
  const allRooms = await Room.find({ where: {
    hotelId,
  } });

  const whereArray = allRooms.map(room => ({ roomId: room.id }));
  const reservationsFound = await Reservation.find({ where: whereArray });
  return allRooms.filter(room => !reservationsFound.find(reservation => reservation.roomId === room.id));
}

export default {
  getRoomsFromHotel,
  getOnlyAvailableRoomsFromHotel,
};
