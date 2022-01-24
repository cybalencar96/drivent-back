import { Request, Response } from "express";
import httpStatus from "http-status";
import service from "@/services/client/hotel";

async function getHotels(req: Request, res: Response) {
  const hotels = await service.listAll();
  return res.status(httpStatus.OK).send(hotels);
}

export default {
  getHotels,
};
