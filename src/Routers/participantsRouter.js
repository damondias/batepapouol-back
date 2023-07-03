import { Router } from "express";
import validateSchemaMiddleware from "../Middlewares/validateSchemaMiddleware.js";
import participantSchema from "../Schemas/participantSchema.js";
import { getParticipants, postParticipant } from "../Controllers/participantsController.js";

const participantsRouter = Router();

participantsRouter.post("/participants", validateSchemaMiddleware(participantSchema), postParticipant) ;
participantsRouter.get("/participants", getParticipants);

export default participantsRouter;