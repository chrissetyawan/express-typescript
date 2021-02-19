import { ModelCtor } from 'sequelize';
import { IContact } from '../../interfaces/Contact';
import { IJob } from '../../interfaces/Job';
import { IOffer } from '../../interfaces/Offer';
import { IRole } from '../../interfaces/Role';
import { ITeam } from '../../interfaces/Team';
import { IUser } from '../../interfaces/User';
import Contact from '../../models/contact.model';
import Jobs from '../../models/jobs.model';
import Offer from '../../models/offers.model'
import Role from '../../models/role.model';
import Team from '../../models/team.model';
import User from '../../models/user.model';

declare global {
  namespace Express {
    export interface Request {
    }    
  }

  namespace Models {
    export type OfferModel = ModelCtor<Offer & IOffer>;
    export type JobModel = ModelCtor<Jobs & IJob>;
    export type ContactModel = ModelCtor<Contact & IContact>;
    export type UserModel = ModelCtor<User & IUser>;
    export type TeamModel = ModelCtor<Team & ITeam>;
    export type RoleModel = ModelCtor<Role & IRole>;
  }
}