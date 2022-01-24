import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";
import ticketRoute from "@/routers/client/ticket";
import reservationRouter from "@/routers/client/reservation";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotel", hotelRouter);
router.use("/room", roomRouter);
router.use("/ticket", tokenValidationMiddleware, ticketRoute);
router.use("/reservation", reservationRouter);

export default router;
