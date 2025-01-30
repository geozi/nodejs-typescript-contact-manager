import { groupConstants } from "../constants/group.constant";

export const groupFailedValidation = {
  NAME_REQUIRED_MESSAGE: "Name is a required field",
  DESCRIPTION_REQUIRED_MESSAGE: "Description is a required field",
  DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE: `Description must be no longer than ${groupConstants.DESCRIPTION_MAX_LENGTH} characters long`,
  DESCRIPTION_BELOW_MIN_LENGTH: `Description must be at least ${groupConstants.DESCRIPTION_MIN_LENGTH} characters long`,
};
