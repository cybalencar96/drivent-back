import { Request, Response } from "express";

import * as ticketService from "@/services/client/ticket";

export async function getTicketInfo(req: Request, res: Response) {
  const ticket = await ticketService.getTicketInfo(req.user.id);
  const price = ticket?.type.price;
  if (price !== undefined) {
    console.log(Number(price).toFixed(2));
  }
  res.send({
    type: ticket?.type.name || null,
    price: Number(ticket?.type.price).toFixed(2) || null,
    hotelPrice: ticket?.type.hotelPrice || null,
    isPaid: !!ticket && ticket.paymentDate !== null,
  });
}
