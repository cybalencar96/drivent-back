import Room from "@/entities/Room";
import Reservation from "@/entities/Reservation";

async function getRoomsFromHotel(hotelId: number) {
  return await Room.find({
    where: {
      hotel: { id: hotelId }
    } });
}

async function getOnlyAvailableRoomsFromHotel(hotelId: number) {
  const allRooms = await Room.find({
    where: {
      hotel: { id: hotelId }
    } });

  const whereArray = allRooms.map(room => ({ room: { id: room.id } }));
  const reservationsFound = await Reservation.find({ where: whereArray, relations: [ "room" ] });
  return allRooms.filter(room => !reservationsFound.find(reservation => reservation.room.id === room.id));
}

export default {
  getRoomsFromHotel,
  getOnlyAvailableRoomsFromHotel,
};
