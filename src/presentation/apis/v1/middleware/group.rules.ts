/**
 * Express validation rules for group-related operations.
 * @module src/presentation/apis/v1/middleware/group.rules
 */
import { check, ValidationChain } from "express-validator";
import { groupFailedValidation } from "../../../../domain/messages/groupValidation.message";
import { groupConstants } from "../../../../domain/constants/group.constant";
import { ID_REGEX } from "../../../../domain/resources/validationRegExp";
import { commonConstants } from "../../../../domain/constants/common.constant";

/**
 * Returns a validation chain for contact group creation.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactGroupCreationRules = (): ValidationChain[] => {
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

/**
 * Returns a validation chain for contact group update.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactGroupUpdateRules = (): ValidationChain[] => {
  return [
    check("id")
      .notEmpty()
      .withMessage(groupFailedValidation.GROUP_ID_REQUIRED)
      .matches(ID_REGEX)
      .withMessage(groupFailedValidation.GROUP_ID_INVALID)
      .isLength({
        min: commonConstants.MONGODB_ID_LENGTH,
        max: commonConstants.MONGODB_ID_LENGTH,
      })
      .withMessage(groupFailedValidation.GROUP_ID_OUT_OF_LENGTH),
    check("name").optional(),
    check("description")
      .optional()
      .isLength({ min: groupConstants.DESCRIPTION_MIN_LENGTH })
      .withMessage(groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH)
      .isLength({ max: groupConstants.DESCRIPTION_MAX_LENGTH })
      .withMessage(groupFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE),
  ];
};

/**
 * Returns a validation chain for contact group deletion.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactGroupDeletionRules = (): ValidationChain[] => {
  return [
    check("id")
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
 * Returns a validation chain for name-based contact group retrieval.
 * @returns {ValidationChain[]} Validation chain.
 */
export const contactGroupRetrievalByName = (): ValidationChain[] => {
  return [
    check("name")
      .notEmpty()
      .withMessage(groupFailedValidation.NAME_REQUIRED_MESSAGE),
  ];
};
