/**
 * Contact controller HTTP response messages.
 * @module src/presentation/messages/contactControllerResponse.message
 */

/**
 * Contains HTTP response messages sent by the contact controller.
 *
 * @type {object}
 * @property {string} CONTACT_CREATED - Message sent when a new contact is created and successfully added to database.
 * @property {string} CONTACT_UPDATED - Message sent when an existing contact record is successfully updated.
 * @property {string} CONTACT_RETRIEVED - Message sent when a contact is successfully retrieved from database.
 */
export const contactControllerResponseMessages = {
  /**
   * Message sent when a new contact is created and successfully added to database.
   * @type {string}
   */
  CONTACT_CREATED: "Successful contact creation",

  /**
   * Message sent when an existing contact record is successfully updated.
   * @type {string}
   */
  CONTACT_UPDATED: "Successful contact update",

  /**
   * Message sent when a contact is successfully retrieved from database.
   * @type {string}
   */
  CONTACT_RETRIEVED: "Successful contact retrieval",
};
