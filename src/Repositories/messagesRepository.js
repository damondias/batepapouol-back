import db from "../database.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function searchParticipant(user){

    return await db.collection("participants").findOne({ name: user })
}

export async function createMessage(message, user){

    return await db.collection("messages").insertOne({
        ...message,
        from: user,
        time: dayjs().format("HH:mm:ss")
      });
}

export async function findMessages(){
    return await db.collection("messages").find({}).toArray();
}

export async function searchParticipantByHeaders(user){

    return await db.collection("participants").findOne({ name: user })
}

export async function searchMessage(id) {

    return await db.collection("messages").findOne({ _id: new ObjectId(id) })
}

export async function updateMessage(id,message){

    return await db.collection("messages").updateOne({
        _id: new ObjectId(id)
        }, {
        $set: message
    });
}

export async function deleteMessage (idMessage){

    return await db.collection("messages").deleteOne({
        _id: idMessage
      });
}