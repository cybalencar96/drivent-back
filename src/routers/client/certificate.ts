import { Router } from "express";

import * as controller from "@/controllers/client/certificate";

const router = Router();

router.get("/", controller.getCertificate);

export default router;
