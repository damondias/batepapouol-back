import db from "../database.js";
import dayjs from "dayjs";

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