import express, { NextFunction } from "express";
import { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors";
import { userRouter } from "./routers/user.router";

const app = express(); // викликаємо express, як функцію

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CRUD - create, read, update, delete

app.use("/users", userRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

app.listen(configs.PORT, () => {
  // listen запускає нашу аплікацію
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
