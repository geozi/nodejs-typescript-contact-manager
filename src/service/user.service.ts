/**
 * User service.
 * @module src/service/user.service
 */
import { Types } from "mongoose";
import { Role } from "../domain/enums/role.enum";
import { IUser } from "../domain/interfaces/iUser.interface";
import { NotFoundError } from "../errors/notFoundError.class";
import { ServerError } from "../errors/serverError.class";
import {
  addUser,
  deleteUser,
  getUserByEmail,
  getUserByUsername,
  getUsersByRole,
  updateUser,
} from "../persistence/user.repository";
import { IUserUpdate } from "../presentation/interfaces/iUserUpdate.interface";
import { commonServiceMessages } from "./messages/commonService.message";
import { userServiceMessages } from "./messages/userService.message";
import { appLogger } from "../../logs/logger.config";

/**
 * Calls on the persistence layer to retrieve the user with the specified username.
 *
 * @param {string} username The username of the user.
 * @returns {Promise<IUser>} An IUser object to which a Promise resolves.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveUserByUsername = async (
  username: string
): Promise<IUser> => {
  try {
    const user = await getUserByUsername(username);
    if (user === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return user;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: retrieveUserByUsername() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: retrieveUserByUsername() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the user with the specified email.
 *
 * @param {string} email The email of the user.
 * @returns {Promise<IUser>} An IUser object to which a Promise resolves.
 * @throws {NotFoundError | ServerError }
 */
export const retrieveUserByEmail = async (email: string): Promise<IUser> => {
  try {
    const user = await getUserByEmail(email);
    if (user === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return user;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: retrieveUserByEmail() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: retrieveUserByEmail() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to retrieve the user profiles with the specified role.
 *
 * @param {Role} role A role assigned to user profiles.
 * @returns {Promise<Array<IUser>>} An array of IUser objects, or an empty array, to which a Promise resolves.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveUsersByRole = async (
  role: Role
): Promise<Array<IUser>> => {
  try {
    const users = await getUsersByRole(role);

    if (users.length === 0) {
      throw new NotFoundError(userServiceMessages.USERS_NOT_FOUND);
    }

    return users;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: retrieveUsersByRole() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: retrieveUsersByRole() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add a new user profile to the database.
 *
 * @param {IUser} newUser The new user to be persisted.
 * @returns {Promise<IUser>} An IUser representation of the saved user to which a Promise resolves.
 * @throws {ServerError}
 */
export const createUserProfile = async (newUser: IUser): Promise<IUser> => {
  try {
    return await addUser(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: ServerError | unknown) {
    appLogger.error(
      `User service: createUserProfile() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update the fields of an existing user profile.
 *
 * @param {Types.ObjectId} id The ID of the user document to be updated.
 * @param {IUserUpdate} updateUserInfo The new information to be persisted in an existing user profile.
 * @returns {Promise<IUser>} An IUser representation of the updated user profile to which a Promise resolves.
 * @throws {NotFoundError | ServerError}
 */
export const updateUserProfile = async (
  id: Types.ObjectId,
  updateUserInfo: IUserUpdate
): Promise<IUser> => {
  try {
    const updatedUser = await updateUser(id, updateUserInfo);
    if (updatedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }
    return updatedUser;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: updateUserProfile() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: updateUserProfile() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to delete a user profile.
 *
 * @param {Types.ObjectId} id The ID of the user document to be deleted.
 * @returns {Promise<IUser>} An IUser representation of the deleted user profile to which a Promise resolves.
 * @throws {NotFoundError | ServerError}
 */
export const deleteUserProfile = async (id: Types.ObjectId): Promise<IUser> => {
  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }
    return deletedUser;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `User service: deleteUserProfile() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `User service: deleteUserProfile() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
