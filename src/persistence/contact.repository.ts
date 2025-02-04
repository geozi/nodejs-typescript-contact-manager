/**
 * Contact repository.
 * @module src/persistence/contact.repository
 */

import { Types } from "mongoose";
import { appLogger } from "../../logs/logger.config";
import { IContact } from "../domain/interfaces/iContact.interface";
import Contact from "../domain/models/contact.model";

/**
 * Returns a contact with the specified email.
 *
 * @param {string} email The email of a contact.
 * @returns {Promise<IContact | null>} A promise that resolves to a Contact object or null.
 */
export const getContactByEmail = async (
  email: string
): Promise<IContact | null> => {
  const foundContact = await Contact.findOne({ email: email });

  appLogger.info(
    `Contact repository: ${Contact.findOne.name} called successfully`
  );

  return foundContact;
};

/**
 * Adds a new contact to the 'contacts' collection.
 *
 * @param {IContact} newContact The new contact to be persisted.
 * @returns {Promise<IContact>} A promise that resolves to a Contact object representing the saved document.
 */
export const addContact = async (newContact: IContact): Promise<IContact> => {
  const savedContact = await newContact.save();

  appLogger.info(
    `Contact repository: ${newContact.save.name} called successfully`
  );

  return savedContact;
};

/**
 * Updates the fields of an existing contact.
 *
 * @param {Types.ObjectId} id The ID of a contact document.
 * @param updateDataObject The new information to be persisted.
 * @returns {Promise<IContact | null>} A promise that resolves to a Contact object representing the updated document or null.
 */
export const updateContact = async (
  id: Types.ObjectId,
  updateDataObject: object
): Promise<IContact | null> => {
  const updatedContact = await Contact.findByIdAndUpdate(id, updateDataObject, {
    new: true,
    runValidators: true,
    context: "query",
  });

  appLogger.info(`Contact repository: findByIdAndUpdate called successfully`);

  return updatedContact;
};

/**
 * Deletes a contact.
 *
 * @param {Types.ObjectId} id The ID of a contact document.
 * @returns {Promise<IContact | null>} A promise that resolves to a Contact object representing the deleted document or null.
 */
export const deleteContact = async (
  id: Types.ObjectId
): Promise<IContact | null> => {
  const deletedContact = await Contact.findByIdAndDelete(id);

  appLogger.info(`Contact repository: findByIdAndDelete called successfully`);

  return deletedContact;
};
