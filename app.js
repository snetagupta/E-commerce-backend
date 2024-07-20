import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const PORT = 8080;

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

