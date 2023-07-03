import { findMessages, searchParticipant } from "../Repositories/messagesRepository.js";


export async function postMessage(req, res){
    const message = req.body;
    const user = req.headers.user;

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