import express, { NextFunction } from "express";
import { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { ApiError } from "./errors";
import { User } from "./models/User";
import { IUser } from "./types/user.type";
import { UserValidator } from "./validators";

const app = express(); // викликаємо express, як функцію

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CRUD - create, read, update, delete

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find().select("-password");
      //const users = await User.find({ gender: Genders.male });

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  },
);

app.get(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  },
);

app.post(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> => {
    //стоворюємо нового користувача
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const createdUser = await User.create(value);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },
);

app.put(
  "/users/:id",
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser>> => {
    //оновлюємо користувача
    try {
      const { id } = req.params;
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...value },
        { returnDocument: "after" },
      );

      return res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:id",
  async (req: Request, res: Response): Promise<Response<void>> => {
    //видаляємо користувача
    try {
      const { id } = req.params;

      await User.deleteOne({ _id: id });

      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  },
);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  return res.status(status).json(error.message);
});

app.listen(configs.PORT, () => {
  // listen запускає нашу аплікацію
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});
