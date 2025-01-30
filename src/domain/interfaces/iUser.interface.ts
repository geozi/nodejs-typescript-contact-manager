import { Role } from "../enums/role.enum";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Role;
}
