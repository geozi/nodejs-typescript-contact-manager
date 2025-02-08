/**
 * Common validation error messages.
 * @module src/domain/messages/commonValidation.message
 */

import { commonConstants } from "../constants/common.constant";

/**
 * Contains error response message(s) that are used when common validation operations fail.
 *
 * @type {object}
 * @property {string} MONGODB_ID_OUT_OF_LENGTH - Message sent when the provided ObjectId is either longer or shorter than the accepted length.
 */
export const commonFailedValidation = {
  /**
   * Message sent when the provided ObjectId is either longer or shorter than the accepted length.
   * @type {string}
   */
  MONGODB_ID_OUT_OF_LENGTH: `ObjectId must be ${commonConstants.MONGODB_ID_LENGTH} characters long`,
};
