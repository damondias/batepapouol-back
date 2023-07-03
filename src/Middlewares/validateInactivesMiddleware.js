import db from "../database.js";

function validateInactivesMiddleware(){

    setInterval(async () => {
        try {
        const lastTenSeconds = Date.now() - 10000;
        const participants = await db.collection("participants").find().toArray();
    
        const inactiveParticipants = participants.filter(participant => participant.lastStatus <= lastTenSeconds)
        if (inactiveParticipants.length === 0) {
            return;
        }
    
        await db.collection("participants").deleteMany({ lastStatus: { $lte: lastTenSeconds } });
    
        const inactiveParticipantsMessages = inactiveParticipants.map(participant => {
            return {
            from: participant.name,
            to: 'Todos',
            text: 'sai da sala...',
            type: 'status',
            time: dayjs().format("HH:mm:ss")
            }
        })
    
        await db.collection("messages").insertMany(inactiveParticipantsMessages);

        } catch (error) {
        console.log(error);
        }
    }, 15000);
}

export default validateInactivesMiddleware;
  