import { Router } from "express";

import * as ticketController from "@/controllers/client/ticket";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.post("/payment", schemaValidatingMiddleware(ticketSchema), ticketController.postTicketPayment);

router.get("/", ticketController.getTicketInfo);

export default router;
