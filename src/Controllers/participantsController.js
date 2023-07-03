import { createParticipant, findParticipants, generateStatus, updateStatus, verifyParticipant, verifyParticipantByHeaders } from "../Repositories/participantsRepository.js";
import { stripHtml } from "string-strip-html";

export async function postParticipant(req, res){
    const participant = req.body;

    participant.name = stripHtml(participant.name).result.trim();
    
    try {

        const existingParticipant = await verifyParticipant(participant);
        if (existingParticipant) {
          return res.sendStatus(409);
        }

        await createParticipant(participant);
        await generateStatus(participant);        
        res.sendStatus(201);

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getParticipants(req, res){

    try {
        const participants = await findParticipants();
        res.send(participants);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function postStatus(req, res){
    const { user } = req.headers;

    try {

        const existingParticipant = await verifyParticipantByHeaders(user);

        if (!existingParticipant) {
        return res.sendStatus(404);
        }

        await updateStatus(existingParticipant);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}