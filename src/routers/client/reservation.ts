import reservation from "@/controllers/client/reservation";
import { Router } from "express";

const router = Router();

router.get("/:userId", reservation.getReservationsByUserId);

export default router;
