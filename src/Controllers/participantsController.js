import { createParticipant, findParticipants, generateStatus, verifyParticipant } from "../Repositories/participantsRepository.js";

export async function postParticipant(req, res){
    const participant = req.body;

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