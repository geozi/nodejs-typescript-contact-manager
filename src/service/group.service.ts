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

export const retrieveContactGroupByName = async (
  name: string
): Promise<IGroup | null> => {
  try {
    const group = await getGroupByName(name);
    if (group === null) {
      throw new NotFoundError(groupServiceMessages.GROUP_NOT_FOUND);
    }
    return group;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Group service: retrieveContactGroupByName() -> NotFoundError generated and caught`
      );
      throw error;
    }

    appLogger.error(
      `Group service: retrieveContactGroupByName() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const createContactGroup = async (newGroup: IGroup): Promise<IGroup> => {
  try {
    return await addGroup(newGroup);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: ServerError | unknown) {
    appLogger.error(
      `Group service: createContactGroup() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const updateContactGroup = async (
  id: Types.ObjectId,
  updateDataObject: IGroupUpdate
): Promise<IGroup | null> => {
  try {
    const updatedGroup = await updateGroup(id, updateDataObject);
    if (updatedGroup === null) {
      throw new NotFoundError(groupServiceMessages.GROUP_NOT_FOUND);
    }

    return updatedGroup;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Group service: updateContactGroup() -> NotFoundError generated and caught`
      );
      throw error;
    }

    appLogger.error(
      `Group service: updateContactGroup() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const deleteContactGroup = async (
  id: Types.ObjectId
): Promise<IGroup | null> => {
  try {
    const deletedGroup = await deleteGroup(id);
    if (deletedGroup === null) {
      throw new NotFoundError(groupServiceMessages.GROUP_NOT_FOUND);
    }

    return deletedGroup;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Group service: deleteContactGroup() -> NotFoundError generated and caught`
      );
      throw error;
    }

    appLogger.error(
      `Group service: deleteContactGroup() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
