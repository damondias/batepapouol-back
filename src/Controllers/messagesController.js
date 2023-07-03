import { createMessage, findMessages, searchParticipant, searchParticipantByHeaders } from "../Repositories/messagesRepository.js";
import { stripHtml } from "string-strip-html";

export async function postMessage(req, res){
    const message = req.body;
    const { user } = req.headers;

    message.to = stripHtml(message.to).result.trim();
    message.text = stripHtml(message.text).result.trim();

    try {
        const existingParticipant = await searchParticipant(user);
        if (!existingParticipant) {
          return res.sendStatus(422);
        }
    
        await createMessage(message, user);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

function filterParticipantMessages(message, participant) {
    const { to, from, type } = message;
    
    const isFromOrToParticipant = to === participant || from === participant || to === 'Todos';
    const isPublic = type === 'message';
  
    if (isFromOrToParticipant || isPublic) {
      return true;
    }
  
    return false;
}

export async function getMessages(req,res){
    const limit = parseInt(req.query.limit);
    const participant = req.headers.user;

    if (limit <= 0) return res.sendStatusstatus(422);
    
    try {

        const messages = await findMessages();

        const participantMessages = messages.filter((message) => filterParticipantMessages(message, participant))
        if (limit !== NaN && limit) {
        return res.send(participantMessages.slice(-limit));
        }
        res.send(participantMessages);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function updateMessage(req,res){
    const message = req.body;
    const { id } = req.params;
    const { user } = req.headers;

    try {

        const existingParticipant = await searchParticipantByHeaders(user);
        if (!existingParticipant) {
        return res.sendStatus(422);
        }

        const existingMessage = await searchMessage(id);
        if (!existingMessage) {
        return res.sendStatus(404);
        }

        if (existingMessage.from !== user) {
        return res.sendStatus(401);
        }

        await updateMessage(id, message);
        res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function deleteMessage(req,res){
    const { id } = req.params;
    const participant = req.headers.user;

    try {
        const existingMessage = await searchMessage(id);
        if (!existingMessage) {
          return res.sendStatus(404);
        }
    
        if (existingMessage.from !== participant) {
          return res.sendStatus(401);
        }
        
        await deleteMessage(existingMessage._id)
        res.sendStatus(200); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
}