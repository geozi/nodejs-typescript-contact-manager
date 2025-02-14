/**
 * Group routes.
 * @module src/presentation/apis/v1/routes/group.route
 */

import {
  authenticateToken,
  verifyToken,
} from "../../../../auth/auth.controller";
import {
  createContactGroup,
  deleteContactGroup,
  fetchContactGroupByName,
  updateContactGroup,
} from "../controllers/group.controller";
import { Router } from "express";

export const groupRouter = Router();
groupRouter.post("/", ...verifyToken, authenticateToken, ...createContactGroup);
groupRouter.put("/", ...verifyToken, authenticateToken, ...updateContactGroup);
groupRouter.delete(
  "/",
  ...verifyToken,
  authenticateToken,
  ...deleteContactGroup
);
groupRouter.get(
  "/name",
  ...verifyToken,
  authenticateToken,
  ...fetchContactGroupByName
);
