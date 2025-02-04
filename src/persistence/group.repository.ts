/**
 * Group repository.
 * @module src/persistence/group.repository
 */
import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { IGroup } from "../domain/interfaces/iGroup.interface";
import Group from "../domain/models/group.model";

/**
 * Returns a contact group with the specified name.
 *
 * @param {string} name The name of a contact group.
 * @returns {Promise<IGroup | null>} A promise that resolves to a Group object or null.
 */
export const getGroupByName = async (name: string): Promise<IGroup | null> => {
  const requestedGroup = await Group.findOne({ name: name });

  appLogger.info(`Group repository: ${Group.findOne.name} called successfully`);

  return requestedGroup;
};

/**
 * Adds a new contact group to the 'groups' collection.
 *
 * @param {IGroup} newGroup The new group to be added.
 * @returns {Promise<IGroup>} A promise that resolves to a Group object representing the saved document.
 */
export const addGroup = async (newGroup: IGroup): Promise<IGroup> => {
  const savedGroup = await newGroup.save();

  appLogger.info(`Group repository: ${newGroup.save.name} called successfully`);

  return savedGroup;
};

/**
 * Updates the fields of an existing contact group.
 *
 * @param {Types.ObjectId} id The ID of a contact group document.
 * @param updateDataObject The new information to be persisted.
 * @returns {Promise<IGroup | null>} A promise that resolves to a Group object representing the updated document or null.
 */
export const updateGroup = async (
  id: Types.ObjectId,
  updateDataObject: object
): Promise<IGroup | null> => {
  const updatedGroup = await Group.findByIdAndUpdate(id, updateDataObject, {
    new: true,
    runValidators: true,
    context: "query",
  });

  appLogger.info(`Group repository: findByIdAndUpdate called successfully`);

  return updatedGroup;
};

/**
 * Deletes a contact group.
 *
 * @param {Types.ObjectId} id The ID of a contact group document.
 * @returns {Promise<IGroup | null>} A promise that resolves to a Group object representing the deleted document or null.
 */
export const deleteGroup = async (
  id: Types.ObjectId
): Promise<IGroup | null> => {
  const deletedGroup = await Group.findByIdAndDelete(id);

  appLogger.info(`Group repository: findByIdAndDelete called successfully`);

  return deletedGroup;
};
