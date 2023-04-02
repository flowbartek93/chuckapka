import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_DB).then((connection) => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
