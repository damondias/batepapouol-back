import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`
 Running API Bate-papo UOL on port ${PORT},
 Url: http://localhost:${PORT} 
`));