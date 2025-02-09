/**
 * Auth controller.
 * @module src/auth/auth.controller
 */

import { Request, Response, NextFunction } from "express";
import { headerValidationRules, userLoginRules } from "./auth.rules";
import { validationResult } from "express-validator";
import { commonResponseMessages } from "../presentation/messages/commonResponse.message";
import { appLogger } from "../../logs/logger.config";
import { ServerError } from "../errors/serverError.class";
import { NotFoundError } from "../errors/notFoundError.class";
import { retrieveUserByUsername } from "../service/user.service";
import bcrypt from "bcryptjs";
import { httpCodes } from "../presentation/codes/responseStatusCodes";
import { authResponseMessages } from "./authResponse.message";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const loginUser = [
  ...userLoginRules(),
  async (req: Request, res: Response): Promise<void> => {
    const expressErrors = validationResult(req);

    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      await res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { username, password } = req.body;
      const user = await retrieveUserByUsername(username);

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res
          .status(httpCodes.UNAUTHORIZED)
          .json({ message: authResponseMessages.AUTHENTICATION_FAILED });
        return;
      }

      const token = jwt.sign(
        { username: user.username },
        process.env.KEY as string,
        {
          expiresIn: "1h",
        }
      );

      await res
        .status(httpCodes.OK)
        .json({
          message: authResponseMessages.AUTHENTICATION_SUCCESS,
          token: token,
        });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError) {
        appLogger.error(
          `Auth controller: loginUser() -> ${error.name} detected and caught`
        );

        res
          .status(httpCodes.UNAUTHORIZED)
          .json({ message: authResponseMessages.AUTHENTICATION_FAILED });
        return;
      }

      if (error instanceof ServerError) {
        appLogger.error(
          `Auth controller: loginUser() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const validateToken = [
  ...headerValidationRules(),
  async (req: Request, res: Response, next: NextFunction) => {
    const expressErrors = validationResult(req);

    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      await res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    next();
  },
];
