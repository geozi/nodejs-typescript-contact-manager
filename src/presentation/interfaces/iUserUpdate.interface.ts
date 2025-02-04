import { Role } from "../../domain/enums/role.enum";

export interface IUserUpdate {
  id: string;
  username?: string;
  email?: string;
  password?: string;
  role?: Role;
}
