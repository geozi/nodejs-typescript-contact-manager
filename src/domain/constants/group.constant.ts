/**
 * Group model constants.
 * @module src/domain/constants/group.constant
 */

/**
 * Contains numeric constants used in the Group model.
 *
 * @type {object}
 * @property {number} DESCRIPTION_MAX_LENGTH - The maximum length required for the description field of the Group model.
 * @property {number} DESCRIPTION_MIN_LENGTH - The minimum length required for the description field of the Group model.
 */
export const groupConstants = {
  /**
   * The maximum length required for the description field of the Group model.
   * @type {number}
   */
  DESCRIPTION_MAX_LENGTH: 50,

  /**
   * The minimum length required for the description field of the Group model.
   * @type {number}
   */
  DESCRIPTION_MIN_LENGTH: 5,
};
