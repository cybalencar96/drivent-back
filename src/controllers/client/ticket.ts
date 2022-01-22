import { Request, Response } from "express";

import * as service from "@/services/client/ticket";
import httpStatus from "http-status";

export async function postTicketPayment(req: Request, res: Response) {
  const { body } = req.body;

  const payment = await service.postTicketPayment(body);

  if (payment === null) {
    return res.sendStatus(httpStatus.CONFLICT);
  }

  if (payment === false) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "usuário não existe" });
  }

  res.send(payment);
}
