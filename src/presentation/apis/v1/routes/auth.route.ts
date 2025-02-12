/**
 * Authentication routes.
 * @module src/presentation/apis/v1/routes/auth.route
 */

import { loginUser } from "../../../../auth/auth.controller";
import { Router } from "express";

export const authRouter = Router();
authRouter.post("/login", ...loginUser);
