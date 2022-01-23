import { Router } from "express";
import hotel from "@/controllers/client/hotel";

const router = Router();

router.get("", hotel.getHotels);

export default router;
