import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routers/index.js";

// import db from "./database.js";
// import dayjs from "dayjs"
import validateInactivesMiddleware from "./Middlewares/validateInactivesMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

// setInterval(async () => {
//     try {
//     const lastTenSeconds = Date.now() - 10000;
//     const participants = await db.collection("participants").find().toArray();

//     const inactiveParticipants = participants.filter(participant => participant.lastStatus <= lastTenSeconds)
//     if (inactiveParticipants.length === 0) {
//         return;
//     }

//     await db.collection("participants").deleteMany({ lastStatus: { $lte: lastTenSeconds } });

//     const inactiveParticipantsMessages = inactiveParticipants.map(participant => {
//         return {
//         from: participant.name,
//         to: 'Todos',
//         text: 'sai da sala...',
//         type: 'status',
//         time: dayjs().format("HH:mm:ss")
//         }
//     })

//     await db.collection("messages").insertMany(inactiveParticipantsMessages);

//     } catch (error) {
//     console.log(error);
//     }
// }, 15000);
validateInactivesMiddleware();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`
 Running API Bate-papo UOL on port ${PORT},
 Url: http://localhost:${PORT} 
`));