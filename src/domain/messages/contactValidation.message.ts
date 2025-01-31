import { contactConstants } from "../constants/contact.constant";

export const contactFailedValidation = {
  FIRST_NAME_REQUIRED_MESSAGE: "First name is a required field",
  FIRST_NAME_INVALID_MESSAGE: "First name must only contain letters",
  FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE: `First name must be at least ${contactConstants.NAME_MIN_LENGTH} characters long`,
  LAST_NAME_REQUIRED_MESSAGE: "Last name is a required field",
  LAST_NAME_INVALID_MESSAGE: "Last name must only contain letters",
  LAST_NAME_BELOW_MIN_LENGTH_MESSAGE: `Last name must be at least ${contactConstants.NAME_MIN_LENGTH} characters long`,
  EMAIL_REQUIRED_MESSAGE: "Contact email is a required field",
  EMAIL_INVALID_MESSAGE: "Contact email is not valid",
  PHONE_NUMBER_REQUIRED_MESSAGE: "Phone number is a required field",
  PHONE_NUMBER_INVALID_MESSAGE: `Phone number must only contain digits and/or hyphens`,
  STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE: `Street address must be at least ${contactConstants.STREET_ADDRESS_MIN_LENGTH} characters long`,
  ZIP_CODE_INVALID_MESSAGE: "Zip code must only contain digits",
  ZIP_CODE_OUT_OF_LENGTH_MESSAGE: `Zip code must be ${contactConstants.ZIP_CODE_LENGTH} characters long`,
  GROUP_ID_REQUIRED: "Group ID is a required field",
  GROUP_ID_BELOW_LENGTH: `Group ID must be ${contactConstants.GROUP_ID_LENGTH} characters long`,
  GROUP_ID_INVALID: "Group ID must be a string of hex characters",
};
