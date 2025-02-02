import { Types } from "mongoose";
import logger from "../../logs/logger.config";
import { IContact } from "../domain/interfaces/iContact.interface";
import Contact from "../domain/models/contact.model";

export const getContactByEmail = async (
  email: string
): Promise<IContact | null> => {
  const foundContact = await Contact.findOne({ email: email });

  logger.info(
    `Contact repository: ${Contact.findOne.name} called successfully`
  );

  return foundContact;
};

export const addContact = async (newContact: IContact): Promise<IContact> => {
  const savedContact = await newContact.save();

  logger.info(
    `Contact repository: ${newContact.save.name} called successfully`
  );

  return savedContact;
};

export const updateContact = async (
  id: Types.ObjectId,
  updateDataObject: object
): Promise<IContact | null> => {
  const updatedContact = await Contact.findByIdAndUpdate(id, updateDataObject, {
    new: true,
    runValidators: true,
    context: "query",
  });

  logger.info(
    `Contact repository: ${Contact.findByIdAndUpdate.name} called successfully`
  );

  return updatedContact;
};

export const deleteContact = async (
  id: Types.ObjectId
): Promise<IContact | null> => {
  const deletedContact = await Contact.findByIdAndDelete(id);

  logger.info(
    `Contact repository: ${Contact.findByIdAndDelete.name} called successfully`
  );

  return deletedContact;
};
