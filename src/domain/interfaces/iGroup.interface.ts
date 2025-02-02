/**
 * IGroup interface.
 * @module src/domain/interfaces/iGroup.interface
 */
import { Document } from "mongoose";

/**
 * Represents a contact Group.
 *
 * @interface
 * @extends {Document}
 * @property {string} name - The name of the contact group.
 * @property {string} description - The description of the contact group.
 *
 */
export interface IGroup extends Document {
  /**
   * The name of the contact group.
   * @type {string}
   */
  name: string;

  /**
   * The description of the contact group.
   * @type {string}
   */
  description: string;
}
