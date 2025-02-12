/**
 * Contact service.
 * @module src/service/contact.service
 */
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
import { UniqueConstraintError } from "../errors/uniqueConstraint.error";

/**
 * Calls on the persistence layer to retrieve a contact with the specified email.
 *
 * @param {string} email The email of the contact person.
 * @returns {Promise<IContact>} An IContact object to which a Promise resolves.
 * @throws {NotFoundError | ServerError}
 */
export const retrieveContactByEmail = async (
  email: string
): Promise<IContact> => {
  try {
    const contact = await getContactByEmail(email);
    if (contact === null) {
      throw new NotFoundError(contactServiceMessages.CONTACT_NOT_FOUND);
    }
    return contact;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Contact service: retrieveContactByEmail() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `Contact service: retrieveContactByEmail() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to add a new contact to the database.
 *
 * @param {IContact} newContact The new contact to be persisted.
 * @returns {Promise<IContact>} The IContact representation of the saved contact to which a Promise resolves.
 * @throws {ServerError}
 */
export const createContactRecord = async (
  newContact: IContact
): Promise<IContact> => {
  try {
    return await addContact(newContact);
  } catch (error: ServerError | UniqueConstraintError | unknown) {
    if (error instanceof UniqueConstraintError) {
      appLogger.error(
        `Contact service: createContactRecord() -> ${error.name} detected and re-thrown`
      );

      throw new UniqueConstraintError(error.message);
    }
    appLogger.error(
      `Contact service: createContactRecord() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to update a contact.
 *
 * @param {Types.ObjectId} id The ID of the contact document to be updated.
 * @param {IContactUpdate} updateDataObject The new information to be persisted in an existing contact.
 * @returns {Promise<IContact>} An IContact representation of the updated contact to which a Promise resolves.
 * @throws { NotFoundError | ServerError }
 */
export const updateContactRecord = async (
  id: Types.ObjectId,
  updateDataObject: IContactUpdate
): Promise<IContact> => {
  try {
    const updatedContact = await updateContact(id, updateDataObject);
    if (updatedContact === null) {
      throw new NotFoundError(contactServiceMessages.CONTACT_NOT_FOUND);
    }

    return updatedContact;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Contact service: updateContactRecord() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `Contact service: updateContactRecord() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};

/**
 * Calls on the persistence layer to delete a contact.
 *
 * @param {Types.ObjectId} id The ID of the contact document to be deleted.
 * @returns {Promise<IContact>} An IContact representation of the deleted contact to which a Promise resolves.
 * @throws { NotFoundError | ServerError }
 */
export const deleteContactRecord = async (
  id: Types.ObjectId
): Promise<IContact> => {
  try {
    const deletedContact = await deleteContact(id);
    if (deletedContact === null) {
      throw new NotFoundError(contactServiceMessages.CONTACT_NOT_FOUND);
    }

    return deletedContact;
  } catch (error: NotFoundError | ServerError | unknown) {
    if (error instanceof NotFoundError) {
      appLogger.error(
        `Contact service: deleteContactRecord() -> ${error.name} detected and re-thrown`
      );
      throw error;
    }

    appLogger.error(
      `Contact service: deleteContactRecord() -> ServerError detected and re-thrown`
    );
    throw new ServerError(commonServiceMessages.SERVER_ERROR);
  }
};
