/**
 * User repository.
 * @module src/persistence/user.repository
 */

import { Types } from "mongoose";
import logger from "../../logs/logger.config";
import { Role } from "../domain/enums/role.enum";
import { IUser } from "../domain/interfaces/iUser.interface";
import User from "../domain/models/user.model";

/**
 * Returns the user with the specified username.
 *
 * @param {string} username The username of a user.
 * @returns {Promise<IUser | null>} A promise that resolves to a User object or null.
 */
export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ username: username });

  logger.info(`User repository: ${User.findOne.name} called successfully`);

  return requestedUser;
};

/**
 * Returns the user with the specified email.
 *
 * @param {string} email The email of a user.
 * @returns {Promise<IUser | null>} A promise that resolves to a User object or null.
 */
export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ email: email });

  logger.info(`User repository: ${User.findOne.name} called successfully`);

  return requestedUser;
};

/**
 * Returns all users with the specified role.
 *
 * @param {Role} role - A role assigned to users.
 * @returns {Promise<Array<IUser>>} A promise that resolves to an array of User objects or an empty array.
 */
export const getUsersByRole = async (role: Role): Promise<Array<IUser>> => {
  const requestedUsers = await User.find({ role: role });

  logger.info(`User repository: ${User.find.name} called successfully`);

  return requestedUsers;
};

/**
 * Adds a new user to the 'users' collection.
 *
 * @param {IUser} newUser The new user to be added.
 * @returns {Promise<IUser>} A promise that resolves to a User object representing the saved document.
 */
export const addUser = async (newUser: IUser): Promise<IUser> => {
  const savedUser = await newUser.save();

  logger.info(`User repository: ${newUser.save.name} called successfully`);

  return savedUser;
};

/**
 * Updates the fields of an existing user profile.
 *
 * @param {Types.ObjectId} id The ID of a user document.
 * @param {object} updateDataObject The new information to be persisted.
 * @returns {Promise<IUser | null>} A promise that resolves to a User object representing the updated document or null.
 */
export const updateUser = async (
  id: Types.ObjectId,
  updateDataObject: object
): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(id, updateDataObject, {
    new: true,
    runValidators: true,
    context: "query",
  });

  logger.info(`User repository: findByIdAndUpdate called successfully`);

  return updatedUser;
};

/**
 * Deletes a user profile.
 *
 * @param {Types.ObjectId} id The ID of a user document.
 * @returns {Promise<IUser | null>} A promise that resolves to a User object representing the deleted document or null.
 */
export const deleteUser = async (id: Types.ObjectId): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(id);

  logger.info(`User repository: findByIdAndDelete called successfully`);

  return deletedUser;
};
