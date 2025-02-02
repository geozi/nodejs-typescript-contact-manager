/**
 * Contact model constants.
 * @module src/domain/constants/contact.constant
 */

/**
 * Contains numeric constants used in the Contact model.
 *
 * @type {object}
 * @property {number} NAME_MIN_LENGTH - The minimum length required for the firstName and lastName fields of the Contact model.
 * @property {number} STREET_ADDRESS_MIN_LENGTH - The minimum length required for the streetAddress field of the Contact model.
 * @property {number} ZIP_CODE_LENGTH - The required length for the zipCode field of the Contact model.
 * @property {number} GROUP_ID_LENGTH - The required length for the groupId field of the Contact model.
 */
export const contactConstants = {
  /**
   * The minimum length required for the firstName and lastName fields of the Contact model.
   * @type {number}
   */
  NAME_MIN_LENGTH: 2,

  /**
   * The minimum length required for the streetAddress field of the Contact model.
   * @type {number}
   */
  STREET_ADDRESS_MIN_LENGTH: 10,

  /**
   * The required length for the zipCode field of the Contact model.
   * @type {number}
   */
  ZIP_CODE_LENGTH: 5,

  /**
   * The required length for the groupId field of the Contact model.
   * @type {number}
   */
  GROUP_ID_LENGTH: 24,
};
