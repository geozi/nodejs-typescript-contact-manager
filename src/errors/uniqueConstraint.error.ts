/**
 * Unique constraint error.
 * @module src/domain/errors/uniqueConstraint.error
 */

import { httpCodes } from "../presentation/codes/responseStatusCodes";
import { AbstractError } from "./abstractError.class";

/**
 * Custom error class for violation of uniqueness.
 * @extends {AbstractError}
 */
export class UniqueConstraintError extends AbstractError {
  /**
   * Creates an instance of UniqueConstraintError.
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(httpCodes.CONFLICT, message);
    this.name = "UniqueConstraintError";
    this.message = message;
  }
}
