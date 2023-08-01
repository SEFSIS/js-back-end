import express from "express";
import { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User";
import { IUser } from "./types/user.type";

const users = [
  {
    name: "Oleg",

    age: 20,

    gender: "male",
  },
  {
    name: "Anton",
    age: 10,
    gender: "male",
  },
  {
    name: "Inokentiy",
    age: 25,
    gender: "female",
  },
  {
    name: "Anastasiya",
    age: 15,
    gender: "female",
  },
  {
    name: "Cocos",
    age: 25,
    gender: "other",
  },
];

const app = express(); // викликаємо express, як функцію

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CRUD - create, read, update, delete

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();
      //const users = await User.find({ gender: Genders.male });

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  },
);

app.get("/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  res.status(200).json(users[+id]);
});

app.listen(configs.PORT, () => {
  // listen запускає нашу аплікацію
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT}`);
});

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    //стоворюємо нового користувача
    try {
      const createdUser = await User.create(req.body);

      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  },
);

app.put("/users/:id", (req: Request, res: Response) => {
  //оновлюємо користувача
  const { id } = req.params;

  users[+id] = req.body;

  res.status(200).json({
    message: "User updated",
    data: users[+id],
  });
});

app.delete("/users/:id", (req: Request, res: Response) => {
  //видаляємо користувача
  const { id } = req.params;

  users.splice(+id, 1);

  res.status(200).json({
    message: "User deleted",
  });
});
