import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { authResponseMessages } from "./authResponse.message";
import { IToken } from "./interfaces/iToken.interface";
import { httpCodes } from "../presentation/codes/responseStatusCodes";
import { IAuthUser } from "./interfaces/iAuthUser.interface";
dotenv.config();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.KEY || "",
};

passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    try {
      const token = jwtPayload.authorization;

      const receivedToken = token.replace("Bearer ", "");

      const decoded = jwt.verify(
        receivedToken,
        process.env.KEY as string
      ) as IToken;

      const username = decoded.username;

      if (username) {
        return done(null, { username: username });
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (error: Error | null, user: IAuthUser) => {
      if (error || !user) {
        return res
          .status(httpCodes.FORBIDDEN)
          .json({ message: authResponseMessages.AUTHORIZATION_FAILED });
      }
      req.body.username = user.username;
      next();
    }
  )(req, res, next);
};
