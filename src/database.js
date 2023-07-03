import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

mongoClient.connect()
           .then(()=> {
                db = mongoClient.db()
                console.log(" MongoDB database is connected")
                })
           .catch((err) => console.log(err.message))

export default db;