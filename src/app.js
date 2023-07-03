import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routers/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`
 Running API Bate-papo UOL on port ${PORT},
 Url: http://localhost:${PORT} 
`));