/**
 * IContact interface.
 * @module src/domain/interfaces/iContact.interface
 */

import { Document, Schema } from "mongoose";

/**
 * Represents a Contact.
 *
 * @interface
 * @extends {Document}
 * @property {string} firstName - The first name of the contact person.
 * @property {string} lastName - The last name of the contact person.
 * @property {string} email - The email of the contact person.
 * @property {string} phoneNumber - The phone number of the contact person.
 * @property {string} streetAddress - (Optional) The street address of the contact person.
 * @property {string} city - (Optional) The city where the contact person resides.
 * @property {string} zipCode - (Optional) The zip code for the contact person's address.
 * @property {string} companyName - (Optional) The company name where the contact person works.
 * @property {Schema.Types.ObjectId} groupId - The ID of the group in which the contact person is categorized.
 *
 */
export interface IContact extends Document {
  /**
   * The first name of the contact person.
   * @type {string}
   */
  firstName: string;

  /**
   * The last name of the contact person.
   * @type {string}
   */
  lastName: string;

  /**
   * The email of the contact person.
   * @type {string}
   */
  email: string;

  /**
   *  The phone number of the contact person.
   * @type {string}
   */
  phoneNumber: string;

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
   * The ID of the group in which the contact person is categorized.
   * @type {string}
   */
  groupId: Schema.Types.ObjectId;
}
