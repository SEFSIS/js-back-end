import { model, Schema, Types } from "mongoose";

import { EActionTokenType } from "../enums/action-token-type.enum";
import { User } from "./User";

const actionSchema = new Schema({
  actionToken: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    required: true,
    enum: EActionTokenType,
  },
  _userId: {
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});

export const Action = model("action", actionSchema);
