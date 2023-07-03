import { Router } from "express"
import validateSchemaMiddleware from "../Middlewares/validateSchemaMiddleware.js";
import messageSchema from "../Schemas/messageSchema.js";
import { getMessages, postMessage } from "../Controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.post("/messages", validateSchemaMiddleware(messageSchema), postMessage);
messagesRouter.get("/messages", getMessages)
export default messagesRouter;