import { Router } from "express"
import validateSchemaMiddleware from "../Middlewares/validateSchemaMiddleware.js";
import messageSchema from "../Schemas/messageSchema.js";
import { deleteMessage, getMessages, postMessage, updateMessage } from "../Controllers/messagesController.js";

const messagesRouter = Router();

messagesRouter.post("/messages", validateSchemaMiddleware(messageSchema), postMessage);
messagesRouter.get("/messages", getMessages);
messagesRouter.put("/messages/:id", validateSchemaMiddleware(messageSchema), updateMessage);
messagesRouter.delete("/messages/:id", deleteMessage);

export default messagesRouter;