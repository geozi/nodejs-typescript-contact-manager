import { check } from "express-validator";
import { contactFailedValidation } from "../../../../domain/messages/contactValidation.message";
import { groupFailedValidation } from "../../../../domain/messages/groupValidation.message";
import { groupConstants } from "../../../../domain/constants/group.constant";
import { ID_REGEX } from "../../../../domain/resources/validationRegExp";

export const contactGroupCreationRules = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage(groupFailedValidation.NAME_REQUIRED_MESSAGE),
    check("description")
      .notEmpty()
      .withMessage(groupFailedValidation.DESCRIPTION_REQUIRED_MESSAGE)
      .isLength({ min: groupConstants.DESCRIPTION_MIN_LENGTH })
      .withMessage(groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH)
      .isLength({ max: groupConstants.DESCRIPTION_MAX_LENGTH })
      .withMessage(groupFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};

export const contactGroupUpdateRules = () => {
  return [
    check("id")
      .notEmpty()
      .withMessage(contactFailedValidation.GROUP_ID_REQUIRED)
      .matches(ID_REGEX)
      .withMessage(contactFailedValidation.GROUP_ID_INVALID)
      .isLength({ min: 24, max: 24 })
      .withMessage(contactFailedValidation.GROUP_ID_OUT_OF_LENGTH),
    check("name").optional(),
    check("description")
      .optional()
      .isLength({ min: groupConstants.DESCRIPTION_MIN_LENGTH })
      .withMessage(groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH)
      .isLength({ max: groupConstants.DESCRIPTION_MAX_LENGTH })
      .withMessage(groupFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};

export const contactGroupDeleteRules = () => {
  return [
    check("id")
      .notEmpty()
      .withMessage(contactFailedValidation.GROUP_ID_REQUIRED)
      .matches(ID_REGEX)
      .withMessage(contactFailedValidation.GROUP_ID_INVALID)
      .isLength({ min: 24, max: 24 })
      .withMessage(contactFailedValidation.GROUP_ID_OUT_OF_LENGTH),
  ];
};

export const contactGroupRetrievalByName = () => {
  return [
    check("name")
      .notEmpty()
      .withMessage(groupFailedValidation.NAME_REQUIRED_MESSAGE),
  ];
};
