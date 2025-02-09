/**
 * Group controller HTTP response messages.
 * @module src/presentation/messages/groupControllerResponse.message
 */

/**
 * Contains HTTP response messages sent by the group controller.
 *
 * @type {object}
 * @property {string} CONTACT_GROUP_CREATED - Message sent when a new contact group is created and successfully added to database.
 * @property {string} CONTACT_GROUP_UPDATED - Message sent when an existing contact group is successfully updated.
 * @property {string} CONTACT_GROUP_RETRIEVED - Message sent when a contact group is successfully retrieved from database.
 */
export const groupControllerResponseMessages = {
  /**
   * Message sent when a new contact group is created and successfully added to database.
   * @type {string}
   */
  CONTACT_GROUP_CREATED: "Successful contact group creation",

  /**
   * Message sent when an existing contact group is successfully updated.
   * @type {string}
   */
  CONTACT_GROUP_UPDATED: "Successful contact group update",

  /**
   * Message sent when a contact group is successfully retrieved from database.
   * @type {string}
   */
  CONTACT_GROUP_RETRIEVED: "Successful contact group retrieval",
};
