import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { contactControllerResponseMessages } from "../../../messages/contactControllerResponse.message";
import { httpCodes } from "../../../codes/responseStatusCodes";
import { ServerError } from "../../../../errors/serverError.class";
import { UniqueConstraintError } from "../../../../errors/uniqueConstraint.error";
import { NotFoundError } from "../../../../errors/notFoundError.class";
import { IContactUpdate } from "../../../interfaces/iContactUpdate.interface";
import { Types } from "mongoose";
import { commonResponseMessages } from "../../../messages/commonResponse.message";
import Contact from "../../../../domain/models/contact.model";
import * as contactService from "../../../../service/contact.service";
import { appLogger } from "../../../../../logs/logger.config";
import {
  contactCreationRules,
  contactDeletionRules,
  contactRetrievalByEmail,
  contactUpdateRules,
} from "../middleware/contact.rules";

export const createContactRecord = [
  ...contactCreationRules(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Contact controller: createContactRecord() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        streetAddress,
        city,
        zipCode,
        companyName,
        groupId,
      } = req.body;

      const newContact = new Contact({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        streetAddress: streetAddress,
        city: city,
        zipCode: zipCode,
        companyName: companyName,
        groupId: groupId,
      });

      await contactService.createContactRecord(newContact);
      res.status(httpCodes.CREATED).json({
        message: contactControllerResponseMessages.CONTACT_CREATED,
      });
    } catch (error: ServerError | UniqueConstraintError | unknown) {
      if (
        error instanceof ServerError ||
        error instanceof UniqueConstraintError
      ) {
        appLogger.error(
          `Contact controller: createContactRecord() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const updateContactRecord = [
  ...contactUpdateRules(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Contact controller: updateContactRecord() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        streetAddress,
        city,
        zipCode,
        companyName,
        groupId,
      } = req.body;

      const contactUpdateInfo: IContactUpdate = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        streetAddress: streetAddress,
        city: city,
        zipCode: zipCode,
        companyName: companyName,
        groupId: groupId,
      };

      const idAsObjectId = new Types.ObjectId(id);
      const updatedContact = await contactService.updateContactRecord(
        idAsObjectId,
        contactUpdateInfo
      );
      res.status(httpCodes.OK).json({
        message: contactControllerResponseMessages.CONTACT_UPDATED,
        data: updatedContact,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `Contact controller: updateContactRecord() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const deleteContactRecord = [
  ...contactDeletionRules(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Contact controller: deleteContactRecord() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { id } = req.body;
      const idAsObjectId = new Types.ObjectId(id);

      await contactService.deleteContactRecord(idAsObjectId);
      res.status(httpCodes.NO_CONTENT).json({});
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `Contact controller: deleteContactRecord() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];

export const fetchContactByEmail = [
  ...contactRetrievalByEmail(),
  async (req: Request, res: Response) => {
    const expressErrors = validationResult(req);
    if (!expressErrors.isEmpty()) {
      const errorMessage = expressErrors.array().map((err) => ({
        message: err.msg,
      }));

      appLogger.error(
        `Contact controller: fetchContactByEmail() -> Express validator errors detected and caught`
      );

      res.status(httpCodes.BAD_REQUEST).json({
        message: commonResponseMessages.BAD_REQUEST,
        errors: errorMessage,
      });
      return;
    }

    try {
      const { email } = req.body;
      const contact = await contactService.retrieveContactByEmail(email);

      res.status(httpCodes.OK).json({
        message: contactControllerResponseMessages.CONTACT_RETRIEVED,
        data: contact,
      });
    } catch (error: NotFoundError | ServerError | unknown) {
      if (error instanceof NotFoundError || error instanceof ServerError) {
        appLogger.error(
          `Contact controller: fetchContactByEmail() -> ${error.name} detected and caught`
        );

        res.status(error.httpCode).json({ message: error.message });
        return;
      }
    }
  },
];
