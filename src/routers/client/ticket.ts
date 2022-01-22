import { Router } from "express";

import * as ticketController from "@/controllers/client/ticket";

const router = Router();

router.get("/", ticketController.getTicketInfo);

export default router;
