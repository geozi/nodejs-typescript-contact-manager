/**
 * Group service layer HTTP responses.
 * @module src/service/messages/groupService.message
 */

/**
 * Contains contact group service HTTP response messages used by the service layer and provided to the presentation layer.
 *
 * @type {object}
 * @property {string} GROUP_NOT_FOUND - Message sent when the requested contact group is not found.
 */
export const groupServiceMessages = {
  /**
   * Message sent when the requested contact group is not found.
   * @type {string}
   */
  GROUP_NOT_FOUND: "Contact group was not found",
};
