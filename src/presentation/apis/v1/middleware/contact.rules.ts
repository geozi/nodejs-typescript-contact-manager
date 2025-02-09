/**
 * Express validation rules for contact-related operations.
 * @module src/presentation/apis/v1/middleware/contact.rules
 */
import { check, ValidationChain } from "express-validator";
import { contactFailedValidation } from "../../../../domain/messages/contactValidation.message";
import { contactConstants } from "../../../../domain/constants/contact.constant";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  ID_REGEX,
  ZIP_CODE_REGEX,
  PHONE_REGEX,
} from "../../../../domain/resources/validationRegExp";
import { groupFailedValidation } from "../../../../domain/messages/groupValidation.message";
import { commonConstants } from "../../../../domain/constants/common.constant";
import { commonFailedValidation } from "../../../../domain/messages/commonValidation.message";

/**
 * Returns a validation chain for contact creation.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactCreationRules = (): ValidationChain[] => {
  return [
    check("firstName")
      .notEmpty()
      .withMessage(contactFailedValidation.FIRST_NAME_REQUIRED_MESSAGE)
      .isLength({ min: contactConstants.NAME_MIN_LENGTH })
      .withMessage(contactFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(contactFailedValidation.FIRST_NAME_INVALID_MESSAGE),
    check("lastName")
      .notEmpty()
      .withMessage(contactFailedValidation.LAST_NAME_REQUIRED_MESSAGE)
      .isLength({ min: contactConstants.NAME_MIN_LENGTH })
      .withMessage(contactFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(contactFailedValidation.LAST_NAME_INVALID_MESSAGE),
    check("email")
      .notEmpty()
      .withMessage(contactFailedValidation.EMAIL_REQUIRED_MESSAGE)
      .matches(EMAIL_REGEX)
      .withMessage(contactFailedValidation.EMAIL_INVALID_MESSAGE),
    check("phoneNumber")
      .notEmpty()
      .withMessage(contactFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE)
      .matches(PHONE_REGEX)
      .withMessage(contactFailedValidation.PHONE_NUMBER_INVALID_MESSAGE),
    check("streetAddress")
      .optional()
      .isLength({ min: contactConstants.STREET_ADDRESS_MIN_LENGTH })
      .withMessage(
        contactFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE
      ),
    check("city").optional(),
    check("zipCode")
      .optional()
      .isLength({
        min: contactConstants.ZIP_CODE_LENGTH,
        max: contactConstants.ZIP_CODE_LENGTH,
      })
      .withMessage(contactFailedValidation.ZIP_CODE_OUT_OF_LENGTH_MESSAGE)
      .matches(ZIP_CODE_REGEX)
      .withMessage(contactFailedValidation.ZIP_CODE_INVALID_MESSAGE),
    check("companyName").optional(),
    check("groupId")
      .notEmpty()
      .withMessage(groupFailedValidation.GROUP_ID_REQUIRED)
      .matches(ID_REGEX)
      .withMessage(groupFailedValidation.GROUP_ID_INVALID)
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(groupFailedValidation.GROUP_ID_OUT_OF_LENGTH),
  ];
};

/**
 * Returns a validation chain for contact update.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactUpdateRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(commonFailedValidation.MONGODB_ID_REQUIRED)
      .matches(ID_REGEX)
      .withMessage(commonFailedValidation.MONGODB_ID_INVALID)
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(commonFailedValidation.MONGODB_ID_OUT_OF_LENGTH),
    check("firstName")
      .optional()
      .isLength({ min: contactConstants.NAME_MIN_LENGTH })
      .withMessage(contactFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(contactFailedValidation.FIRST_NAME_INVALID_MESSAGE),
    check("lastName")
      .optional()
      .isLength({ min: contactConstants.NAME_MIN_LENGTH })
      .withMessage(contactFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE)
      .matches(NAME_REGEX)
      .withMessage(contactFailedValidation.LAST_NAME_INVALID_MESSAGE),
    check("email")
      .optional()
      .matches(EMAIL_REGEX)
      .withMessage(contactFailedValidation.EMAIL_INVALID_MESSAGE),
    check("phoneNumber")
      .optional()
      .matches(PHONE_REGEX)
      .withMessage(contactFailedValidation.PHONE_NUMBER_INVALID_MESSAGE),
    check("streetAddress")
      .optional()
      .isLength({ min: contactConstants.STREET_ADDRESS_MIN_LENGTH })
      .withMessage(
        contactFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE
      ),
    check("city").optional(),
    check("zipCode")
      .optional()
      .isLength({
        min: contactConstants.ZIP_CODE_LENGTH,
        max: contactConstants.ZIP_CODE_LENGTH,
      })
      .withMessage(contactFailedValidation.ZIP_CODE_OUT_OF_LENGTH_MESSAGE)
      .matches(ZIP_CODE_REGEX)
      .withMessage(contactFailedValidation.ZIP_CODE_INVALID_MESSAGE),
    check("companyName").optional(),
    check("groupId")
      .optional()
      .matches(ID_REGEX)
      .withMessage(groupFailedValidation.GROUP_ID_INVALID)
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(groupFailedValidation.GROUP_ID_OUT_OF_LENGTH),
  ];
};

/**
 * Returns a validation chain for contact deletion.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactDeletionRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(commonFailedValidation.MONGODB_ID_REQUIRED)
      .matches(ID_REGEX)
      .withMessage(commonFailedValidation.MONGODB_ID_INVALID)
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(commonFailedValidation.MONGODB_ID_OUT_OF_LENGTH),
  ];
};

/**
 * Returns a validation chain for email-based contact retrieval.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactRetrievalByEmail = (): ValidationChain[] => {
  return [
    check("email")
      .notEmpty()
      .withMessage(contactFailedValidation.EMAIL_REQUIRED_MESSAGE)
      .matches(EMAIL_REGEX)
      .withMessage(contactFailedValidation.EMAIL_INVALID_MESSAGE),
  ];
};
