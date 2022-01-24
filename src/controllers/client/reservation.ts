import { Request, Response } from "express";
import service from "@/services/client/reservation";
import httpStatus from "http-status";

async function getReservationsByUserId(req: Request, res: Response) {
  const { userId } = req.params;
  const reservationsFound = await service.getUserReservations(+userId);

  return res.status(httpStatus.OK).send(reservationsFound);
}

export default {
  getReservationsByUserId,
};
