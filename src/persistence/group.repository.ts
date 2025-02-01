import { Types } from "mongoose";
import logger from "../../logs/logger.config";
import { IGroup } from "../domain/interfaces/iGroup.interface";
import Group from "../domain/models/group.model";

export const getGroupByName = async (name: string): Promise<IGroup | null> => {
  const requestedGroup = await Group.findOne({ name: name });

  logger.info(`Group.findOne({name:name}) called successfully`);

  return requestedGroup;
};

export const addGroup = async (newGroup: IGroup): Promise<IGroup> => {
  const savedGroup = await newGroup.save();

  logger.info(`Group.prototype.save() called successfully`);

  return savedGroup;
};

export const updateGroup = async (
  id: Types.ObjectId,
  updateDataObject: object
): Promise<IGroup | null> => {
  const updatedGroup = await Group.findByIdAndUpdate(id, updateDataObject, {
    new: true,
    runValidators: true,
    context: "query",
  });

  logger.info(
    `Group.findByIdAndUpdate(id, updateDataObject) called successfully`
  );

  return updatedGroup;
};

export const deleteGroup = async (
  id: Types.ObjectId
): Promise<IGroup | null> => {
  const deletedGroup = await Group.findByIdAndDelete(id);

  logger.info(`Group.findByIdAndDelete(id) called successfully`);

  return deletedGroup;
};
