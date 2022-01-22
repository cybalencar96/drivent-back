import { Request, Response } from "express";

import * as ticketService from "@/services/client/ticket";

export async function getTicketInfo(req: Request, res: Response) {
  const ticket = await ticketService.getTicketInfo(req.user.id);
  res.send({
    type: ticket?.type.name || null,
    price: ticket?.type.price || null,
    hotelPrice: ticket?.type.hotelPrice || null,
    isPaid: !!ticket && ticket.paymentDate !== null,
  });
}
