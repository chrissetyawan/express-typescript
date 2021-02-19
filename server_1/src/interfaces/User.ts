import { IRole } from "./Role";
import { ITeam } from "./Team";

export interface IUser {
  roleId: number;
  teamId: number;
  username: string;
  fullname: string;
  role: IRole | undefined;
  team: ITeam | undefined;
}