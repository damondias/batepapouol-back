import db from "../database.js";
import dayjs from "dayjs"

export async function verifyParticipant(participant){

    return await db.collection('participants').findOne({ name: participant.name });
}

export async function createParticipant(participant){

    return await db.collection('participants').insertOne({ ...participant, lastStatus: Date.now() });
}

export async function generateStatus({ name }){

    return await db.collection('messages').insertOne({
        from: name,
        to: 'Todos',
        text: 'entra na sala...',
        type: 'status',
        time: dayjs().format("HH:mm:ss")
    });
}