/**
 * Auth controller.
 * @module src/auth/auth.controller
 */

import { Request, Response, NextFunction } from "express";
import { headerVerificationRules, userLoginRules } from "./auth.rules";
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
import { IToken } from "./interfaces/iToken.interface";
import { commonServiceMessages } from "../service/messages/commonService.message";
dotenv.config();

/**
 * Middleware array that contains user login logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} userLoginRules - Express validation rules for user login.
 * @property {Function} anonymousAsyncFunction - Handles user login requests and responses.
 */

export const loginUser = [
  ...userLoginRules(),

  /**
   * Processes HTTP requests for user login.
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
        `Auth controller: loginUser() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
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

      res.status(httpCodes.OK).json({
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

/**
 * Middleware array that contains auth header verification logic.
 *
 * @type {Array<object>}
 * @property {ValidationChain[]} headerVerificationRules - Express validation rules for auth header verification.
 * @property {Function} anonymousAsyncFunction - Handles auth header verification requests and responses.
 */
export const verifyToken = [
  ...headerVerificationRules(),

  /**
   * Processes HTTP requests for header verification.
   *
   * @param {Request} req - An HTTP request.
   * @param {Response} res - An HTTP response.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const expressErrors = validationResult(req);

    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Auth controller: verifyToken() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const token = req.headers.authorization;
      if (!token) {
        appLogger.error(`Auth controller: verifyToken() -> undefined token`);

        res.status(httpCodes.BAD_REQUEST).json({
          message: commonResponseMessages.BAD_REQUEST,
          errors: [
            { message: authResponseMessages.AUTHORIZATION_TOKEN_INVALID },
          ],
        });
        return;
      }

      const receivedToken = token.replace("Bearer ", "");

      const decoded = jwt.verify(
        receivedToken,
        process.env.KEY as string
      ) as IToken;

      const username = decoded.username;
      req.body.loggedInUsername = username;

      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      appLogger.error(`Auth controller: verifyToken() -> Authorization failed`);

      res
        .status(httpCodes.FORBIDDEN)
        .json({ message: authResponseMessages.AUTHORIZATION_FAILED });
      return;
    }
  },
];

/**
 * Processes HTTP requests for token authentication.
 *
 * @param {Request} req - An HTTP request.
 * @param {Response} res - An HTTP response.
 * @param {NextFunction} next - A build-in Express function to move further down the routing path.
 * @returns {Promise<void>} A Promise that resolves to void.
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const loggedInUsername = req.body.loggedInUsername;
    await retrieveUserByUsername(loggedInUsername);
    next();
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Auth controller: authenticateToken() -> Authorization failed`
      );

      res.status(httpCodes.FORBIDDEN).json({
        message: authResponseMessages.AUTHORIZATION_FAILED,
      });
      return;
    }

    if (error instanceof ServerError) {
      appLogger.error(
        `Auth controller: authenticateToken() -> ${error.name} detected and caught`
      );

      res
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json({ message: commonServiceMessages.SERVER_ERROR });
      return;
    }
  }
};
