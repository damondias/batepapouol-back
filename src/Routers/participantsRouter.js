import { Router } from "express";
import validateSchemaMiddleware from "../Middlewares/validateSchemaMiddleware.js";
import participantSchema from "../Schemas/participantSchema.js";
import { postParticipant } from "../Controllers/participantsController.js";

const participantsRouter = Router();

participantsRouter.post("/participants", validateSchemaMiddleware(participantSchema), postParticipant) ;
participantsRouter.get("/participants", (req, res) =>  res.sendStatus(200))

export default participantsRouter;