import { Schema, model } from "mongoose";
import { IContact } from "../interfaces/iContact.interface";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { contactFailedValidation } from "../messages/contactValidation.message";
import { contactConstants } from "../constants/contact.constant";
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
  ZIP_CODE_REGEX,
} from "../resources/validationRegExp";

const contactSchema = new Schema<IContact>(
  {
    firstName: {
      type: String,
      required: [true, contactFailedValidation.FIRST_NAME_REQUIRED_MESSAGE],
      match: [NAME_REGEX, contactFailedValidation.FIRST_NAME_INVALID_MESSAGE],
      minLength: [
        contactConstants.NAME_MIN_LENGTH,
        contactFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
      ],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, contactFailedValidation.LAST_NAME_REQUIRED_MESSAGE],
      match: [NAME_REGEX, contactFailedValidation.LAST_NAME_INVALID_MESSAGE],
      minLength: [
        contactConstants.NAME_MIN_LENGTH,
        contactFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE,
      ],
      trim: true,
    },
    email: {
      type: String,
      required: [true, contactFailedValidation.EMAIL_REQUIRED_MESSAGE],
      match: [EMAIL_REGEX, contactFailedValidation.EMAIL_INVALID_MESSAGE],
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, contactFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE],
      match: [
        PHONE_REGEX,
        contactFailedValidation.PHONE_NUMBER_INVALID_MESSAGE,
      ],
      trim: true,
    },
    streetAddress: {
      type: String,
      minLength: [
        contactConstants.STREET_ADDRESS_MIN_LENGTH,
        contactFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
      ],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      match: [ZIP_CODE_REGEX, contactFailedValidation.ZIP_CODE_INVALID_MESSAGE],
      minLength: [
        contactConstants.ZIP_CODE_LENGTH,
        contactFailedValidation.ZIP_CODE_OUT_OF_LENGTH_MESSAGE,
      ],
      maxLength: [
        contactConstants.ZIP_CODE_LENGTH,
        contactFailedValidation.ZIP_CODE_OUT_OF_LENGTH_MESSAGE,
      ],
      trim: true,
    },
    company: {
      type: String,
    },
  },
  {
    collection: "contacts",
    timestamps: true,
  }
);

contactSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} already exists in the database",
  type: "UniqueConstraintError",
});
export default model<IContact>("Contact", contactSchema);
