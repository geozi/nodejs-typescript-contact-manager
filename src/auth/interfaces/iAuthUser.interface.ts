/**
 * IAuthUser interface.
 * @module src/auth/interfaces/iAuthUser.interface
 */

/**
 * Represents an IAuthUser object.
 *
 * @interface
 * @property {string} username - The username of the logged in user.
 */
export interface IAuthUser {
  /**
   * The username of the logged in user.
   * @type {string}
   */
  username: string;
}
