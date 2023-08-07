import Joi from "joi";

import { regexConstants } from "../constants";
import { Genders } from "../enums/user.enum";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(18).max(199);
  static gender = Joi.valid(...Object.values(Genders));
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .messages({
      "string.empty": "Це поле обов'язкове",
      "string.email": "Адреса електронної пошти має неправильний формат",
    });
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();

  static create = Joi.object({
    //статичний метод потрібний для того, щоб не створювати екземпляр класу,а звертатися до методів напряму
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });
  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });

  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
