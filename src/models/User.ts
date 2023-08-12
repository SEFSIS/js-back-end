import { model, Schema } from "mongoose";

import { Genders } from "../enums/user.enum";
import { EUserStatus } from "../enums/user-status.enum";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [18, "Minimum value for age is 18"],
      max: [199, "Maximum value for age is 199"],
    },
    gender: {
      type: String,
      enum: Genders,
    },
    status: {
      type: String,
      default: EUserStatus.Inactive,
      enum: EUserStatus,
    },
    email: {
      type: String,
      required: true,
      trim: true, //обріже пробіли
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const User = model("user", userSchema);
