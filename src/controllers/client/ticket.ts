import { Request, Response } from "express";

import * as ticketService from "@/services/client/ticket";
import httpStatus from "http-status";

export async function postTicketPayment(req: Request, res: Response) {
  const { body } = req.body;

  if (!body) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid body" });
  }
  const payment = await ticketService.postTicketPayment(body);

  if (payment === null) {
    return res.sendStatus(httpStatus.CONFLICT);
  }

  if (payment === false) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: "usuário não existe" });
  }

  res.send(payment);
}

export async function getTicketInfo(req: Request, res: Response) {
  const ticket = await ticketService.getTicketInfo(req.user.id);
  if (!ticket) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  res.send({
    type: ticket.type.name,
    price: ticket.type.price,
    hotelPrice: ticket.type.hotelPrice,
    isPaid: !!ticket && ticket.paymentDate !== null,
  });
}
