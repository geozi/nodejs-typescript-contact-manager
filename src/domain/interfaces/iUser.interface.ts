/**
 * IUser interface.
 * @module src/domain/interfaces/iUser.interface
 */
import { Role } from "../enums/role.enum";
import { Document } from "mongoose";

/**
 * Represents a User.
 *
 * @interface
 * @extends {Document}
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {Role} role - The role assigned to the user.
 */
export interface IUser extends Document {
  /**
   *  The username of the user.
   * @type {string}
   */
  username: string;

  /**
   * The email of the user.
   * @type {string}
   */
  email: string;

  /**
   * The password of the user.
   * @type {string}
   */
  password: string;

  /**
   * The role assigned to the user.
   * @enum
   * @type {Role}
   */
  role: Role;
}
