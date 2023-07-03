import { Router } from "express";
import participantsRouter from "./participantsRouter.js";
import messagesRouter from "./messagesRouter.js";
import validateInactivesMiddleware from "../Middlewares/validateInactivesMiddleware.js";

const router = Router();

router.use(validateInactivesMiddleware);

router.use(participantsRouter);
router.use(messagesRouter);

export default router;