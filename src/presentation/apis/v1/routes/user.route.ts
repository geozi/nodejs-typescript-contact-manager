/**
 * User routes.
 * @module src/presentation/apis/v1/routes/user.route
 */
import { verifyToken } from "../../../../auth/auth.controller";
import {
  registerUser,
  updateUserInfo,
  fetchUserByEmail,
  fetchUserByUsername,
  fetchUsersByRole,
} from "../controllers/user.controller";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/", ...registerUser);
userRouter.put("/", ...verifyToken, ...updateUserInfo);
userRouter.get("/email", ...verifyToken, ...fetchUserByEmail);
userRouter.get("/username", ...verifyToken, ...fetchUserByUsername);
userRouter.get("/role", ...verifyToken, ...fetchUsersByRole);
