/**
 * Contact routes.
 * @module src/presentation/apis/v1/routes/contact.route
 */

import { verifyToken } from "../../../../auth/auth.controller";
import {
  createContactRecord,
  updateContactRecord,
  deleteContactRecord,
  fetchContactByEmail,
} from "../controllers/contact.controller";
import { Router } from "express";

export const contactRouter = Router();
contactRouter.post("/", ...verifyToken, ...createContactRecord);
contactRouter.put("/", ...verifyToken, ...updateContactRecord);
contactRouter.delete("/", ...verifyToken, ...deleteContactRecord);
contactRouter.get("/email", ...verifyToken, ...fetchContactByEmail);
