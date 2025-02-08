import { validationResult } from "express-validator";
import {
  contactGroupCreationRules,
  contactGroupUpdateRules,
  contactGroupDeleteRules,
  contactGroupRetrievalByName,
} from "../middleware/group.rules";
import { Request, Response } from "express";
import { groupControllerResponseMessages } from "../../../messages/groupControllerResponse.message";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraint.error";
import { NotFoundError } from "../../../../errors/notFoundError.class";
import { IGroupUpdate } from "../../../interfaces/iGroupUpdate.interface";
import { Types } from "mongoose";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import Group from "../../../../domain/models/group.model";
import * as groupService from "../../../../service/group.service";
import { appLogger } from "../../../../../logs/logger.config";

export const createContactGroup = [
  ...contactGroupCreationRules(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Group controller: createContactGroup() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { name, description } = req.body;
      const newGroup = new Group({
        name: name,
        description: description,
      });

      await groupService.createContactGroup(newGroup);
      res.status(httpCodes.CREATED).json({
        message: groupControllerResponseMessages.CONTACT_GROUP_CREATED,
      });
    } catch (error: ServerError | UniqueConstraintError | unknown) {
      if (
        error instanceof ServerError ||
        error instanceof UniqueConstraintError
      ) {
        appLogger.error(
          `Group controller: createContactGroup() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const updateContactGroup = [
  ...contactGroupUpdateRules(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Group controller: updateContactGroup() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { id, name, description } = req.body;
      const idAsObjectId = new Types.ObjectId(id);
      const groupUpdateInfo: IGroupUpdate = {
        name: name,
        description: description,
      };
      const updatedContactGroup = await groupService.updateContactGroup(
        idAsObjectId,
        groupUpdateInfo
      );

      res.status(httpCodes.OK).json({
        message: groupControllerResponseMessages.CONTACT_GROUP_UPDATED,
        data: updatedContactGroup,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `Group controller: updateContactGroup() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const deleteContactGroup = [
  ...contactGroupDeleteRules(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Group controller: deleteContactGroup() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { id } = req.body;
      const idAsObjectId = new Types.ObjectId(id);
      await groupService.deleteContactGroup(idAsObjectId);
      res.status(httpCodes.NO_CONTENT).json({});
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `Group controller: deleteContactGroup() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const fetchContactGroupByName = [
  ...contactGroupRetrievalByName(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Group controller: fetchContactGroupByName() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { name } = req.body;
      const contactGroup = await groupService.retrieveContactGroupByName(name);
      res.status(httpCodes.OK).json({
        message: groupControllerResponseMessages.CONTACT_GROUP_RETRIEVED,
        data: contactGroup,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `Group controller: fetchContactGroupByName() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
