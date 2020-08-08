import express, { Request, Response, NextFunction } from "express";
import todos from "./routes/todos";
import user from "./routes/user.route";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const uri: string = process.env.AZURE_STRING!;

app.use(json());
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);

app.use(urlencoded({ extended: true }));

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Azure connected");
  })
  .catch((err) => {
    console.log("Error connect " + err);
  });

app.use("/todos", todos);
app.use("/api/user", user);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
