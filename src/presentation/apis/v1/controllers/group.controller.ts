/**
 * Group controller.
 * @module src/presentation/apis/v1/controllers/group.controller
 */
import { validationResult } from "express-validator";
import {
  contactGroupCreationRules,
  contactGroupUpdateRules,
  contactGroupDeletionRules,
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

/**
 * Middleware array that contains contact group creation logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} contactGroupCreationRules - Express validation rules for contact group creation.
 * @property {Function} anonymousAsyncFunction - Handles contact group creation requests and responses.
 */
export const createContactGroup = [
  ...contactGroupCreationRules(),

  /**
   * Processes HTTP requests for contact group creation.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
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

/**
 * Middleware array that contains contact group update logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain} contactGroupUpdateRules - Express validation rules for contact group update.
 * @property {Function} anonymousAsyncFunction - Handles contact group update requests and responses.
 */
export const updateContactGroup = [
  ...contactGroupUpdateRules(),

  /**
   * Processes HTTP requests for contact group update.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
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

/**
 * Middleware array that contains contact group deletion logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} contactGroupDeletionRules - Express validation rules for contact group deletion.
 * @property {Function} anonymousAsyncFunction - Handles contact group deletion requests and responses.
 */
export const deleteContactGroup = [
  ...contactGroupDeletionRules(),

  /**
   * Processes HTTP requests for contact group deletion.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
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

/**
 * Middleware array that contains name-based contact group retrieval logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} contactGroupRetrievalByName - Express validation rules for name-based contact group retrieval.
 * @property {Function} anonymousAsyncFunction - Handles name-based contact group retrieval requests and responses.
 */
export const fetchContactGroupByName = [
  ...contactGroupRetrievalByName(),

  /**
   * Processes HTTP requests for name-based contact group retrieval.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response): Promise<void> => {
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
