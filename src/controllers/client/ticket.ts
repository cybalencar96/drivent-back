import { Request, Response } from "express";

import * as ticketService from "@/services/client/ticket";

export async function getTicketInfo(req: Request, res: Response) {
  const ticket = await ticketService.getTicketInfo(req.user.id);
  res.send({
    type: ticket.type.name,
    price: ticket.type.price,
    hotelPrice: ticket.type.hotelPrice,
    isPaid: !!ticket && ticket.paymentDate !== null,
  });
}
