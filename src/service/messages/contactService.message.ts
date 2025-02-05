/**
 * Contact service layer HTTP responses.
 * @module src/service/messages/contactService.message
 */

/**
 * Contains contact service HTTP response messages used by the service layer and provided to the presentation layer.
 *
 * @type {object}
 * @property {string} CONTACT_NOT_FOUND - Message sent when the requested contact is not found.
 */
export const contactServiceMessages = {
  /**
   * Message sent when the requested contact is not found.
   * @type {string}
   */
  CONTACT_NOT_FOUND: "Contact was not found",
};
