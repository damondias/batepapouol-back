import { createParticipant, generateStatus, verifyParticipant } from "../Repositories/participantsRepository.js";

export async function postParticipant(req, res){
    const participant = req.body;

    try {

        const existingParticipant = await verifyParticipant(participant);
        console.log(existingParticipant);
        if (existingParticipant) {
          return res.sendStatus(409);
        }

        await createParticipant(participant);
        await generateStatus(participant);        
        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message);
    }
}