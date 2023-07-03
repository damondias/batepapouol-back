import { Router } from "express";
import participantsRouter from "./participantsRouter.js";

const router = Router();

router.use(participantsRouter)

export default router;