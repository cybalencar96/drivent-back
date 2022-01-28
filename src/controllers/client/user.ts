import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/user";

export async function signUp(req: Request, res: Response) {
  const user = await service.createNewUser(req.body.email, req.body.password);
  res.status(httpStatus.CREATED).send(user);
}

export async function listEvents(req: Request, res: Response) {
  const { userId } = req.params;
  const events = await service.listUserEvents(+userId);
  return res.status(httpStatus.OK).send(events);
}

export async function signInEvent(req: Request, res: Response) {
  const { userId, eventId } = req.body;
  const signature = await service.signToEvent(userId, eventId);
  return res.status(httpStatus.CREATED).send(signature);
}
