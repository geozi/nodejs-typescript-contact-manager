/**
 * Contact routes.
 * @module src/presentation/apis/v1/routes/contact.route
 */

import {
  authenticateToken,
  verifyToken,
} from "../../../../auth/auth.controller";
import {
  createContactRecord,
  updateContactRecord,
  deleteContactRecord,
  fetchContactByEmail,
} from "../controllers/contact.controller";
import { Router } from "express";

export const contactRouter = Router();
contactRouter.post("/", ...verifyToken, authenticateToken, createContactRecord);
contactRouter.put("/", ...verifyToken, authenticateToken, updateContactRecord);
contactRouter.delete(
  "/",
  ...verifyToken,
  authenticateToken,
  deleteContactRecord
);
contactRouter.get(
  "/email",
  ...verifyToken,
  authenticateToken,
  fetchContactByEmail
);
