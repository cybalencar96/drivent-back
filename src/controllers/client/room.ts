import { Request, Response } from "express";
import httpStatus from "http-status";
import service from "@/services/client/room";

async function getRoomsByHotelId(req: Request, res: Response) {
  const { hotelId } = req.params;

  const rooms = await service.getRoomsFromHotel(+hotelId);
  return res.status(httpStatus.OK).send(rooms);
}

async function getAvailableRooms(req: Request, res: Response) {
  const { hotelId } = req.params;

  const rooms = await service.getOnlyAvailableRoomsFromHotel(+hotelId);
  return res.status(httpStatus.OK).send(rooms);
}

async function getRoomDetails(req: Request, res: Response) {
  const { hotelId } = req.params;
  const rooms = await service.getRoomDetailsFromHotel(+hotelId);
  return res.send(rooms);
}

async function reserveRoom(req: Request, res: Response) {
  const { roomId } = req.params;
  const reservation = await service.reserveRoom(req.user.id, +roomId);
  return res.send(reservation);
}

export default {
  getRoomsByHotelId,
  getAvailableRooms,
  getRoomDetails,
  reserveRoom,
};
