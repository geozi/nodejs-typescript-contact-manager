/**
 * Group validation error messages.
 * @module src/domain/messages/groupValidation.message
 */
import { groupConstants } from "../constants/group.constant";

/**
 * Contains error response messages that are used when group validation fails.
 *
 * @type {object}
 * @property {string} NAME_REQUIRED_MESSAGE - Message sent when no name is provided.
 * @property {string} DESCRIPTION_REQUIRED_MESSAGE - Message sent when no description is provided.
 * @property {string} DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE - Message sent when the provided description is too long.
 * @property {string} DESCRIPTION_BELOW_MIN_LENGTH - Message sent when the provided description is too short.
 */
export const groupFailedValidation = {
  /**
   * Message sent when no name is provided.
   * @type {string}
   */
  NAME_REQUIRED_MESSAGE: "Name is a required field",

  /**
   * Message sent when no description is provided.
   * @type {string}
   */
  DESCRIPTION_REQUIRED_MESSAGE: "Description is a required field",

  /**
   * Message sent when the provided description is too long.
   * @type {string}
   */
  DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE: `Description must be no longer than ${groupConstants.DESCRIPTION_MAX_LENGTH} characters long`,

  /**
   * Message sent when the provided description is too short.
   * @type {string}
   */
  DESCRIPTION_BELOW_MIN_LENGTH: `Description must be at least ${groupConstants.DESCRIPTION_MIN_LENGTH} characters long`,
};
