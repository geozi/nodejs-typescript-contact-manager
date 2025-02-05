import { Types } from "mongoose";
import { IContact } from "../domain/interfaces/iContact.interface";
import { NotFoundError } from "../errors/notFoundError.class";
import { ServerError } from "../errors/serverError.class";
import {
  addContact,
  deleteContact,
  getContactByEmail,
  updateContact,
} from "../persistence/contact.repository";
import { commonServiceMessages } from "./messages/commonService.message";
import { contactServiceMessages } from "./messages/contactService.message";
import { IContactUpdate } from "../presentation/interfaces/iContactUpdate.interface";
import { appLogger } from "../../logs/logger.config";

export const retrieveContactByEmail = async (
  email: string
): Promise<IContact | null> => {
  try {
    const contact = await getContactByEmail(email);
    if (contact === null) {
      throw new NotFoundError(contactServiceMessages.CONTACT_NOT_FOUND);
    }
    return contact;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Contact service: retrieveContactByEmail() -> NotFoundError generated and caught`
      );
      throw error;
    }

    appLogger.error(
      `Contact service: retrieveContactByEmail() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const createContactRecord = async (
  newContact: IContact
): Promise<IContact> => {
  try {
    return await addContact(newContact);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: ServerError | unknown) {
    appLogger.error(
      `Contact service: createContactRecord() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const updateContactRecord = async (
  id: Types.ObjectId,
  updateDataObject: IContactUpdate
): Promise<IContact | null> => {
  try {
    const updatedContact = await updateContact(id, updateDataObject);
    if (updatedContact === null) {
      throw new NotFoundError(contactServiceMessages.CONTACT_NOT_FOUND);
    }

    return updatedContact;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Contact service: updateContactRecord() -> NotFoundError generated and caught`
      );
      throw error;
    }

    appLogger.error(
      `Contact service: updateContactRecord() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

export const deleteContactRecord = async (id: Types.ObjectId) => {
  try {
    const deletedContact = await deleteContact(id);
    if (deletedContact === null) {
      throw new NotFoundError(contactServiceMessages.CONTACT_NOT_FOUND);
    }

    return deletedContact;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Contact service: deleteContactRecord() -> NotFoundError generated and caught`
      );
      throw error;
    }

    appLogger.error(
      `Contact service: deleteContactRecord() -> ServerError generated and caught`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
