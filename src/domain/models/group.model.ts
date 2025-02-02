/**
 * Group model schema.
 * @module src/domain/models/group.model
 */

import { Schema, model } from "mongoose";
import { IGroup } from "../interfaces/iGroup.interface";
import mongooseUniqueValidator from "mongoose-unique-validator";
import { groupFailedValidation } from "../messages/groupValidation.message";
import { groupConstants } from "../constants/group.constant";

/**
 * Group schema for persistence in MongoDB.
 *
 * @type {Schema<IGroup>}
 * @property {string} name - The name of the contact group.
 * @property {string} description - The description of the contact group.
 */
const groupSchema = new Schema<IGroup>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, groupFailedValidation.NAME_REQUIRED_MESSAGE],
      trim: true,
    },
    description: {
      type: String,
      required: [true, groupFailedValidation.DESCRIPTION_REQUIRED_MESSAGE],
      maxLength: [
        groupConstants.DESCRIPTION_MAX_LENGTH,
        groupFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
      ],
      minLength: [
        groupConstants.DESCRIPTION_MIN_LENGTH,
        groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH,
      ],
      trim: true,
    },
  },
  {
    collection: "groups",
    timestamps: true,
  }
);

groupSchema.plugin(mongooseUniqueValidator, {
  message: "{PATH} already exists in the database",
  type: "UniqueConstraintError",
});
export default model<IGroup>("Group", groupSchema);
