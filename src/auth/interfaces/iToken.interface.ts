/**
 * IToken interface.
 * @module src/auth/interfaces/iToken.interface
 */

/**
 * Represents a json web token.
 *
 * @interface
 * @property {string} loggedInUser - The username of the logged in user.
 */
export interface IToken {
  /**
   *  The username of the logged in user.
   * @type {string}
   */
  loggedInUser: string;
}
