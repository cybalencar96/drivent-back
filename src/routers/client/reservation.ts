import reservation from "@/controllers/client/reservation";
import { Router } from "express";

const router = Router();

router.get("/:userId", reservation.getReservationsByUserId);
router.get("/amount/:roomId", reservation.getReservationsAmount);

export default router;
