/**
 * Group service.
 * @module src/service/group.service
 */
import { Types } from "mongoose";
import { IGroup } from "../domain/interfaces/iGroup.interface";
import { NotFoundError } from "../errors/notFoundError.class";
import { ServerError } from "../errors/serverError.class";
import { IGroupUpdate } from "../presentation/interfaces/iGroupUpdate.interface";
import {
  addGroup,
  deleteGroup,
  getGroupByName,
  updateGroup,
} from "../../src/persistence/group.repository";
import { commonServiceMessages } from "./messages/commonService.message";
import { groupServiceMessages } from "./messages/groupService.message";
import { appLogger } from "../../logs/logger.config";
import { UniqueConstraintError } from "../errors/uniqueConstraint.error";
import { Error } from "mongoose";

/**
 * Calls on the persistence layer to retrieve a contact group with the specified name.
 *
 * @param {string} name The name of a contact group.
 * @returns {Promise<IGroup>} An IGroup object to which a Promise resolves.
 * @throws  {NotFoundError | ServerError}
 */
export const retrieveContactGroupByName = async (
  name: string
): Promise<IGroup> => {
  try {
    const group = await getGroupByName(name);
    if (group === null) {
      throw new NotFoundError(groupServiceMessages.GROUP_NOT_FOUND);
    }
    return group;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Group service: retrieveContactGroupByName() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `Group service: retrieveContactGroupByName() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add a new contact group to the database.
 *
 * @param {IGroup} newGroup The new contact group to be persisted.
 * @returns {Promise<IGroup>} An IGroup representation of the saved contact group to which a Promise resolves.
 * @throws {ServerError}
 */
export const createContactGroup = async (newGroup: IGroup): Promise<IGroup> => {
  try {
    return await addGroup(newGroup);
  } catch (error: ServerError | UniqueConstraintError | unknown) {
    if (error instanceof Error.ValidationError) {
      appLogger.error(
        `Group service: createContactGroup() -> ${error.name} detected and re-thrown`
      );

      throw new UniqueConstraintError(error.message);
    }

    appLogger.error(
      `Group service: createContactGroup() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update the fields of an existing contact group.
 *
 * @param {Types.ObjectId} id The ID of the contact group document to be updated.
 * @param {IGroupUpdate} updateDataObject The new information to be persisted in an existing contact group.
 * @returns {Promise<IGroup>} An IGroup representation of the updated contact group to which a Promise resolves.
 * @throws {NotFoundError | ServerError}
 */
export const updateContactGroup = async (
  id: Types.ObjectId,
  updateDataObject: IGroupUpdate
): Promise<IGroup> => {
  try {
    const updatedGroup = await updateGroup(id, updateDataObject);
    if (updatedGroup === null) {
      throw new NotFoundError(groupServiceMessages.GROUP_NOT_FOUND);
    }

    return updatedGroup;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Group service: updateContactGroup() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `Group service: updateContactGroup() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to delete a contact group.
 *
 * @param {Types.ObjectId} id The ID of the contact group document to be deleted.
 * @returns {Promise<IGroup>} An IGroup representation of the deleted document to which a Promise resolves.
 * @throws {NotFoundError | ServerError}
 */
export const deleteContactGroup = async (
  id: Types.ObjectId
): Promise<IGroup> => {
  try {
    const deletedGroup = await deleteGroup(id);
    if (deletedGroup === null) {
      throw new NotFoundError(groupServiceMessages.GROUP_NOT_FOUND);
    }

    return deletedGroup;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Group service: deleteContactGroup() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `Group service: deleteContactGroup() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
