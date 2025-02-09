/**
 * IGroupUpdate interface.
 * @module src/presentation/interfaces/iGroupUpdate.interface
 */

/**
 * Represents a data object used in contact group update operations.
 *
 * @interface
 * @property {string} name - (Optional) The name of the contact group.
 * @property {string} description - (Optional) The description of the contact group.
 */
export interface IGroupUpdate {
  /**
   * (Optional) The name of the contact group.
   * @type {string}
   */
  name?: string;

  /**
   * (Optional) The description of the contact group.
   * @type {string}
   */
  description?: string;
}
