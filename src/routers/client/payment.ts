import { Router } from "express";

import * as paymentController from "@/controllers/client/payment";

const router = Router();

router.get("/", paymentController.getTicketInfo);

export default router;
