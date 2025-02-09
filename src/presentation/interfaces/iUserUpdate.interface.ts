/**
 * IUserUpdate interface.
 * @module src/presentation/interfaces/iUserUpdate.interface
 */
import { Role } from "../../domain/enums/role.enum";

/**
 * Represents a data object used in user update operations.
 *
 * @interface
 * @property {string} username - (Optional) The username of the user.
 * @property {string} email - (Optional) The email of the user.
 * @property {string} password - (Optional) The password of the user.
 * @property {Role} role - (Optional) The role assigned to the user.
 */
export interface IUserUpdate {
  /**
   * (Optional) The username of the user.
   * @type {string}
   */
  username?: string;

  /**
   * (Optional) The email of the user.
   * @type {string}
   */
  email?: string;

  /**
   * (Optional) The password of the user.
   * @type {string}
   */
  password?: string;

  /**
   * (Optional) The role assigned to the user.
   * @type {string}
   */
  role?: Role;
}
