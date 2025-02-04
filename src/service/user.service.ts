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

export const retrieveUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  try {
    const user = await getUserByUsername(username);
    if (user === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return user;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const retrieveUserByEmail = async (
  email: string
): Promise<IUser | null> => {
  try {
    const user = await getUserByEmail(email);
    if (user === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }

    return user;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

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
      throw error;
    }

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const createUserProfile = async (newUser: IUser): Promise<IUser> => {
  try {
    const savedUser = await addUser(newUser);
    return savedUser;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: ServerError | unknown) {
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const updateUserProfile = async (
  id: Types.ObjectId,
  updateUserInfo: IUserUpdate
): Promise<IUser | null> => {
  try {
    const updatedUser = await updateUser(id, updateUserInfo);
    if (updatedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }
    return updatedUser;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const deleteUserProfile = async (id: Types.ObjectId) => {
  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser === null) {
      throw new NotFoundError(userServiceMessages.USER_NOT_FOUND);
    }
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
