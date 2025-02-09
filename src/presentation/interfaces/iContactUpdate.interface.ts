/**
 * IContactUpdate interface.
 * @module src/presentation/interfaces/iContactUpdate.interface
 */

/**
 * Represents a data object used in contact update operations.
 *
 * @interface
 * @property {string} firstName - (Optional) The first name of the contact person.
 * @property {string} lastName - (Optional) The last name of the contact person.
 * @property {string} email - (Optional) The email of the contact person.
 * @property {string} phoneNumber - (Optional) The phone number of the contact person.
 * @property {string} streetAddress - (Optional) The street address of the contact person.
 * @property {string} city - (Optional) The city where the contact person resides.
 * @property {string} zipCode - (Optional) The zip code for the contact person's address.
 * @property {string} companyName - (Optional) The company name where the contact person works.
 * @property {Schema.Types.ObjectId} groupId - (Optional) The ID of the group in which the contact person is categorized.
 */
export interface IContactUpdate {
  /**
   * (Optional) The first name of the contact person.
   * @type {string}
   */
  firstName?: string;

  /**
   * (Optional) The last name of the contact person.
   * @type {string}
   */
  lastName?: string;

  /**
   * (Optional) The email of the contact person.
   * @type {string}
   */
  email?: string;

  /**
   * (Optional) The phone number of the contact person.
   * @type {string}
   */
  phoneNumber?: string;

  /**
   * (Optional) The street address of the contact person.
   * @type {string}
   */
  streetAddress?: string;

  /**
   * (Optional) The city where the contact person resides.
   * @type {string}
   */
  city?: string;

  /**
   * (Optional) The zip code for the contact person's address.
   * @type {string}
   */
  zipCode?: string;

  /**
   * (Optional) The company name where the contact person works.
   * @type {string}
   */
  companyName?: string;

  /**
   * (Optional) The ID of the group in which the contact person is categorized.
   * @type {string}
   */
  groupId?: string;
}
