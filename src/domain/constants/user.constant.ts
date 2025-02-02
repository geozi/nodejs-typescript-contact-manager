/**
 * User model constants.
 * @module src/domain/constants/user.constant
 */

/**
 * Contains numeric constants used in the User model.
 *
 * @type {object}
 * @property {number} USERNAME_MAX_LENGTH - The maximum length required for the username field of the User model.
 * @property {number} USERNAME_MIN_LENGTH - The minimum length required for the username field of the User model.
 * @property {number} PASSWORD_MIN_LENGTH - The minimum length required for the password field of the User model.
 */
export const userConstants = {
  /**
   * The maximum length required for the username field of the User model.
   * @type {number}
   */
  USERNAME_MAX_LENGTH: 20,

  /**
   * The minimum length required for the username field of the User model.
   * @type {number}
   */
  USERNAME_MIN_LENGTH: 3,

  /**
   * The minimum length required for the password field of the User model.
   * @type {number}
   */
  PASSWORD_MIN_LENGTH: 7,
};
