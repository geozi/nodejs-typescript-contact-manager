/**
 * User validation error messages.
 * @module src/domain/messages/userValidation.message
 */

import { userConstants } from "../constants/user.constant";

/**
 * Contains error response messages that are used when user validation fails.
 *
 * @type {object}
 * @property {string} USERNAME_REQUIRED_MESSAGE - Message sent when no username is provided.
 * @property {string} USERNAME_ABOVE_MAX_LENGTH_MESSAGE - Message sent when the provided username is too long.
 * @property {string} USERNAME_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided username is too short.
 * @property {string} EMAIL_REQUIRED_MESSAGE - Message sent when no email is provided.
 * @property {string} EMAIL_INVALID_MESSAGE - Message sent when the provided email does not match the standard regex pattern.
 * @property {string} PASSWORD_REQUIRED_MESSAGE - Message sent when no password is provided.
 * @property {string} PASSWORD_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided password is too short.
 * @property {string} PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE - Message sent when the provided password does not match the standard regex pattern.
 * @property {string} ROLE_REQUIRED_MESSAGE - Message sent when no role is provided.
 * @property {string} ROLE_INVALID_MESSAGE - Message sent when the provided role does not match the standard regex pattern.
 *
 * The standard regex patterns mentioned above can be found in:
 * [src/domain/resources/validationRegExp.ts]
 */
export const userFailedValidation = {
  /**
   * Message sent when no username is provided.
   * @type {string}
   */
  USERNAME_REQUIRED_MESSAGE: "Username is a required field",

  /**
   * Message sent when the provided username is too long.
   * @type {string}
   */
  USERNAME_ABOVE_MAX_LENGTH_MESSAGE: `Username must be no longer than ${userConstants.USERNAME_MAX_LENGTH} characters`,

  /**
   *  Message sent when the provided username is too short.
   * @type {string}
   */
  USERNAME_BELOW_MIN_LENGTH_MESSAGE: `Username must be at least ${userConstants.USERNAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no email is provided.
   * @type {string}
   */
  EMAIL_REQUIRED_MESSAGE: "User email is a required field",

  /**
   * Message sent when the provided email does not match the standard regex pattern.
   * @type {string}
   */
  EMAIL_INVALID_MESSAGE: "User email is not valid",

  /**
   * Message sent when no password is provided.
   * @type {string}
   */
  PASSWORD_REQUIRED_MESSAGE: "Password is a required field",

  /**
   *  Message sent when the provided password is too short.
   * @type {string}
   */
  PASSWORD_BELOW_MIN_LENGTH_MESSAGE: `Password must be at least ${userConstants.PASSWORD_MIN_LENGTH} characters long`,

  /**
   * Message sent when the provided password does not match the standard regex pattern.
   * @type {string}
   */
  PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE: `Password must have at least: one lowercase character, one uppercase character, one number, and one special symbol`,

  /**
   * Message sent when no role is provided.
   * @type {string}
   */
  ROLE_REQUIRED_MESSAGE: "Role is a required field",

  /**
   *  Message sent when the provided role does not match the standard regex pattern.
   * @type {string}
   */
  ROLE_INVALID_MESSAGE: "Role must be either Admin or user",
};
