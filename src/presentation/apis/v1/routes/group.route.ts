/**
 * Group routes.
 * @module src/presentation/apis/v1/routes/group.route
 */

import { verifyToken } from "../../../../auth/auth.controller";
import {
  createContactGroup,
  deleteContactGroup,
  fetchContactGroupByName,
  updateContactGroup,
} from "../controllers/group.controller";
import { Router } from "express";

export const groupRouter = Router();
groupRouter.post("/", ...verifyToken, ...createContactGroup);
groupRouter.put("/", ...verifyToken, ...updateContactGroup);
groupRouter.delete("/", ...verifyToken, ...deleteContactGroup);
groupRouter.get("/name", ...verifyToken, ...fetchContactGroupByName);
