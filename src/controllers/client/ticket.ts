import { Request, Response } from "express";

import * as ticketService from "@/services/client/ticket";
import httpStatus from "http-status";

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
