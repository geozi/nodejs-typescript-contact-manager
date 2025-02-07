import { validationResult } from "express-validator";
import {
  userProfileDeleteRules,
  userProfileUpdateRules,
  userRegistrationRules,
  userRetrievalByEmailRules,
  userRetrievalByRoleRules,
  userRetrievalByUsernameRules,
} from "../middleware/user.rules";
import { Request, Response } from "express";
import { userControllerResponseMessages } from "../../../messages/userControllerResponse.message";
import User from "../../../../domain/models/user.model";
import {
  createUserProfile,
  deleteUserProfile,
  retrieveUserByEmail,
  retrieveUserByUsername,
  retrieveUsersByRole,
  updateUserProfile,
} from "../../../../service/user.service";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraint.error";
import { NotFoundError } from "../../../../errors/notFoundError.class";
import { IUserUpdate } from "../../../interfaces/iUserUpdate.interface";
import { Types } from "mongoose";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import { appLogger } from "../../../../../logs/logger.config";

export const registerUser = [
  ...userRegistrationRules(),
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: registerUser() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { username, email, password, role } = req.body;
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        role: role,
      });
      await createUserProfile(newUser);
      res
        .status(httpCodes.CREATED)
        .json({ message: userControllerResponseMessages.USER_REGISTERED });
    } catch (error: ServerError | UniqueConstraintError | unknown) {
      if (
        error instanceof ServerError ||
        error instanceof UniqueConstraintError
      ) {
        appLogger.error(
          `User controller: registerUser() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const updateUserInfo = [
  ...userProfileUpdateRules(),
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: updateUserInfo() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { id, username, email, password } = req.body;
      const idAsObjectId = new Types.ObjectId(id);
      const userUpdateInfo: IUserUpdate = {
        username: username,
        email: email,
        password: password,
      };

      const updatedUser = await updateUserProfile(idAsObjectId, userUpdateInfo);
      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_UPDATED,
        data: updatedUser,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `User controller: updateUserInfo() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const deleteUserInfo = [
  ...userProfileDeleteRules(),
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: deleteUserInfo() -> Express validator errors detected and caught`
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
      await deleteUserProfile(idAsObjectId);
      res.status(httpCodes.NO_CONTENT).json({});
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `User controller: deleteUserInfo() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const fetchUserByUsername = [
  ...userRetrievalByUsernameRules(),
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: fetchUserByUsername() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { username } = req.body;
      const user = await retrieveUserByUsername(username);
      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_RETRIEVED,
        data: user,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `User controller: fetchUserByUsername() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const fetchUserByEmail = [
  ...userRetrievalByEmailRules(),
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: fetchUserByEmail() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { email } = req.body;
      const user = await retrieveUserByEmail(email);
      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_RETRIEVED,
        data: user,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `User controller: fetchUserByEmail() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const fetchUsersByRole = [
  ...userRetrievalByRoleRules(),
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `User controller: fetchUsersByRole() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { role } = req.body;
      const users = await retrieveUsersByRole(role);
      res.status(httpCodes.OK).json({
        message: userControllerResponseMessages.USER_S_RETRIEVED,
        data: users,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `User controller: fetchUsersByRole() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
