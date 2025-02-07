/**
 * Contact validation error messages.
 * @module src/domain/messages/contactValidation.message
 */
import { contactConstants } from "../constants/contact.constant";

/**
 * Contains error response messages that are used when contact validation fails.
 *
 * @type {object}
 * @property {string} FIRST_NAME_REQUIRED_MESSAGE - Message sent when no first name is provided.
 * @property {string} FIRST_NAME_INVALID_MESSAGE - Message sent when the provided first name does not match the standard regex pattern.
 * @property {string} FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided first name is too short.
 * @property {string} LAST_NAME_REQUIRED_MESSAGE - Message sent when no last name is provided.
 * @property {string} LAST_NAME_INVALID_MESSAGE - Message sent when the provided last name does not match the standard regex pattern.
 * @property {string} LAST_NAME_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided last name is too short.
 * @property {string} EMAIL_REQUIRED_MESSAGE - Message sent when no email is provided.
 * @property {string} EMAIL_INVALID_MESSAGE - Message sent when the provided email does not match the standard regex pattern.
 * @property {string} PHONE_NUMBER_REQUIRED_MESSAGE - Message sent when no phone number is provided.
 * @property {string} PHONE_NUMBER_INVALID_MESSAGE - Message sent when the provided phone number does not match the standard regex pattern.
 * @property {string} STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE - Message sent when the provided street address is too short.
 * @property {string} ZIP_CODE_INVALID_MESSAGE - Message sent when the provided zip code does not match the standard regex pattern.
 * @property {string} ZIP_CODE_OUT_OF_LENGTH_MESSAGE - Message sent when the provided zip code is longer or shorter than the accepted length.
 */
export const contactFailedValidation = {
  /**
   * Message sent when no first name is provided.
   * @type {string}
   */
  FIRST_NAME_REQUIRED_MESSAGE: "First name is a required field",

  /**
   * Message sent when the provided first name does not match the standard regex pattern.
   * @type {string}
   */
  FIRST_NAME_INVALID_MESSAGE: "First name must only contain letters",

  /**
   *  Message sent when the provided first name is too short.
   * @type {string}
   */
  FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE: `First name must be at least ${contactConstants.NAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no last name is provided.
   * @type {string}
   */
  LAST_NAME_REQUIRED_MESSAGE: "Last name is a required field",

  /**
   * Message sent when the provided last name does not match the standard regex pattern.
   * @type {string}
   */
  LAST_NAME_INVALID_MESSAGE: "Last name must only contain letters",

  /**
   * Message sent when the provided last name is too short.
   * @type {string}
   */
  LAST_NAME_BELOW_MIN_LENGTH_MESSAGE: `Last name must be at least ${contactConstants.NAME_MIN_LENGTH} characters long`,

  /**
   * Message sent when no email is provided.
   * @type {string}
   */
  EMAIL_REQUIRED_MESSAGE: "Contact email is a required field",

  /**
   * Message sent when the provided email does not match the standard regex pattern.
   * @type {string}
   */
  EMAIL_INVALID_MESSAGE: "Contact email is not valid",

  /**
   * Message sent when no phone number is provided.
   * @type {string}
   */
  PHONE_NUMBER_REQUIRED_MESSAGE: "Phone number is a required field",

  /**
   * Message sent when the provided phone number does not match the standard regex pattern.
   * @type {string}
   */
  PHONE_NUMBER_INVALID_MESSAGE: `Phone number must only contain digits and/or hyphens`,

  /**
   * Message sent when the provided street address is too short.
   * @type {string}
   */
  STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE: `Street address must be at least ${contactConstants.STREET_ADDRESS_MIN_LENGTH} characters long`,

  /**
   * Message sent when the provided zip code does not match the standard regex pattern.
   * @type {string}
   */
  ZIP_CODE_INVALID_MESSAGE: "Zip code must only contain digits",

  /**
   * Message sent when the provided zip code is longer or shorter than the accepted length.
   * @type {string}
   */
  ZIP_CODE_OUT_OF_LENGTH_MESSAGE: `Zip code must be ${contactConstants.ZIP_CODE_LENGTH} characters long`,
};
