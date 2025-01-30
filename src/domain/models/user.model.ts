import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/iUser.interface";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../resources/validationRegExp";
import { userFailedValidation } from "../messages/userValidation.message";
import { userConstants } from "../constants/user.constant";
import { Role } from "../enums/role.enum";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, userFailedValidation.USERNAME_REQUIRED_MESSAGE],
      maxLength: [
        userConstants.USERNAME_MAX_LENGTH,
        userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE,
      ],
      minLength: [
        userConstants.USERNAME_MIN_LENGTH,
        userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
      ],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, userFailedValidation.EMAIL_REQUIRED_MESSAGE],
      match: [EMAIL_REGEX, userFailedValidation.EMAIL_INVALID_MESSAGE],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, userFailedValidation.PASSWORD_REQUIRED_MESSAGE],
      match: [
        PASSWORD_REGEX,
        userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE,
      ],
      trim: true,
    },
    role: {
      type: String,
      required: [true, userFailedValidation.ROLE_REQUIRED_MESSAGE],
      enum: {
        values: [Role.Admin, Role.User],
        message: userFailedValidation.ROLE_INVALID_MESSAGE,
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} already exists in the database",
  type: "UniqueConstraintError",
});
export default model<IUser>("User", userSchema);
