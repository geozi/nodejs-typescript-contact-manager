import { Role } from "../../domain/enums/role.enum";

export interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
  role?: Role;
}
