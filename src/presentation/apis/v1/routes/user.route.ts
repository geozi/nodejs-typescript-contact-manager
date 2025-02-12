/**
 * User routes.
 * @module src/presentation/apis/v1/routes/user.route
 */
import {
  authenticateToken,
  verifyToken,
} from "../../../../auth/auth.controller";
import {
  registerUser,
  updateUserInfo,
  deleteUserInfo,
  fetchUserByEmail,
  fetchUserByUsername,
  fetchUsersByRole,
} from "../controllers/user.controller";
import { Router } from "express";

export const userRouter = Router();
userRouter.post("/", ...registerUser);
userRouter.put("/", ...verifyToken, authenticateToken, ...updateUserInfo);
userRouter.delete("/", ...verifyToken, authenticateToken, ...deleteUserInfo);
userRouter.get(
  "/email",
  ...verifyToken,
  authenticateToken,
  ...fetchUserByEmail
);
userRouter.get(
  "/username",
  ...verifyToken,
  authenticateToken,
  ...fetchUserByUsername
);
userRouter.get("/role", ...verifyToken, authenticateToken, ...fetchUsersByRole);
