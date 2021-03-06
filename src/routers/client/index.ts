import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import ticketRouter from "@/routers/client/ticket";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotel", tokenValidationMiddleware, hotelRouter);
router.use("/room", tokenValidationMiddleware, roomRouter);
router.use("/ticket", tokenValidationMiddleware, ticketRouter);

export default router;
