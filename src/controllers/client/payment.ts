import { Request, Response } from "express";

import * as paymentService from "@/services/client/payment";

export async function getTicketInfo(req: Request, res: Response) {
  const ticket = await paymentService.getTicketInfo(req.user.id);
  res.send({ isPaid: ticket?.paymentDate !== null });
}
