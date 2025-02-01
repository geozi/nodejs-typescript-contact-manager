import { Types } from "mongoose";
import logger from "../../logs/logger.config";
import { IContact } from "../domain/interfaces/iContact.interface";
import Contact from "../domain/models/contact.model";

export const getContactByEmail = async (
  email: string
): Promise<IContact | null> => {
  const foundContact = await Contact.findOne({ email: email });

  logger.info(`Contact.findOne({email: email}) called successfully`);

  return foundContact;
};

export const addContact = async (newContact: IContact): Promise<IContact> => {
  const savedContact = await newContact.save();

  logger.info(`Contact.prototype.save() called successfully`);

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
    `Contact.findByIdAndUpdate(id, updateDataObject) called successfully`
  );

  return updatedContact;
};

export const deleteContact = async (
  id: Types.ObjectId
): Promise<IContact | null> => {
  const deletedContact = await Contact.findByIdAndDelete(id);

  logger.info(`Contact.findByIdAndDelete(id) called successfully`);

  return deletedContact;
};
