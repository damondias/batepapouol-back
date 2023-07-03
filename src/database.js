import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
     await mongoClient.connect();
     console.log(" MongoDB database is connected")

} catch (error) {
     console.log(error.message)
}

let db = mongoClient.db();

export default db;