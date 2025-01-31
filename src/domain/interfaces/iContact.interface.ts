import { Document, Schema } from "mongoose";

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress?: string;
  city?: string;
  zipCode?: string;
  company?: string;
  groupId: Schema.Types.ObjectId;
}
