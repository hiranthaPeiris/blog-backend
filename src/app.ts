import express, { Request, Response, NextFunction } from "express";
import todos from "./routes/todos";
import {json} from 'body-parser';

const app = express();

app.use("/todos", todos);
app.use(json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err });
});

app.listen(3000);