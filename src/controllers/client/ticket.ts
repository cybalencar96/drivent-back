import { Request, Response } from "express";

import * as service from "@/services/client/ticket";

export async function postTicket(req: Request, res: Response) {
  const { body } = req.body;
  console.log(body);
  const user = await service.postTicketPayment(body);
  res.send(user);
}
