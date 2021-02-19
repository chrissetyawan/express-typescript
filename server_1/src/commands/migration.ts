import Contact from "../models/contact.model";
import Jobs from "../models/jobs.model";
import User from "../models/user.model";
import Offer from "../models/offers.model";
import Role from "../models/role.model";
import Team from "../models/team.model";

async function migrate() {
  // Important to do this in order to make it safe executed while it has relation
  await Jobs.sync().catch(err => console.log("Error while creating jobs table : " + err));
  await Role.sync().catch(err => console.log("Error while creating roles table : " + err));
  await Team.sync().catch(err => console.log("Error while creating teams table : " + err));
  await User.sync().catch(err => console.log("Error while creating contact table : " + err));
  await Contact.sync().catch(err => console.log("Error while creating contact table : " + err));
  await Offer.sync().catch(err => console.log("Error while creating offers table : " + err));

  console.log("💡 Database: Migration successfully executed.")

}

migrate();
