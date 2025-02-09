/**
 * Auth response messages.
 * @module src/auth/authResponse.message
 */

/**
 * Contains auth response messages.
 *
 * @type {object}
 * @property {string} AUTH_FAILED - Message sent when authentication has failed.
 * @property {string} AUTH_SUCCESS - Message sent when authentication is successful.
 * @property {string} AUTH_HEADER_REQUIRED - Message sent when the login request does not contain an authorization header.
 * @property {string} AUTH_TOKEN_INVALID - Message sent when the token in the request is invalid.
 */
export const authResponseMessages = {
  /**
   * Message sent when authentication has failed.
   * @type {string}
   */
  AUTHENTICATION_FAILED: "Authentication failed",

  /**
   * Message sent when authentication is successful.
   * @type {string}
   */
  AUTHENTICATION_SUCCESS: "Login successful",

  /**
   * Message sent when the login request does not contain an authorization header.
   * @type {string}
   */
  AUTHORIZATION_HEADER_REQUIRED: "Authorization header is required",

  /**
   * Message sent when the token in the request is invalid.
   * @type {string}
   */
  AUTHORIZATION_TOKEN_INVALID: "Invalid token",
};
