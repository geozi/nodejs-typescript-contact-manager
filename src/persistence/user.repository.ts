import { Types } from "mongoose";
import logger from "../../logs/logger.config";
import { Role } from "../domain/enums/role.enum";
import { IUser } from "../domain/interfaces/iUser.interface";
import User from "../domain/models/user.model";

export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ username: username });

  logger.info(`User repository: ${User.findOne.name} called successfully`);

  return requestedUser;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  const requestedUser = await User.findOne({ email: email });

  logger.info(`User repository: ${User.findOne.name} called successfully`);

  return requestedUser;
};

export const getUsersByRole = async (role: Role): Promise<Array<IUser>> => {
  const requestedUsers = await User.find({ role: role });

  logger.info(`User repository: ${User.find.name} called successfully`);

  return requestedUsers;
};

export const addUser = async (newUser: IUser): Promise<IUser> => {
  const savedUser = await newUser.save();

  logger.info(`User repository: ${newUser.save.name} called successfully`);

  return savedUser;
};

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

export const deleteUser = async (id: Types.ObjectId): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(id);

  logger.info(`User repository: findByIdAndDelete called successfully`);

  return deletedUser;
};
