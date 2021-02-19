import User from "../models/user.model";
import Role from "../models/role.model";
import Team from "../models/team.model";

async function seeder() {

  await Role.bulkCreate([
    {name: "Leader"},
    {name: "Member"},
  ]);
  
  await Team.bulkCreate([
    {name: "Eagle Team"}
  ]);
  
  await User.bulkCreate([
    {roleId: 1, teamId: 1, email:"nicole@gmail.com", username: "nicole", fullname: "Nicole"},
    {roleId: 2, teamId: 1, email:"irene@gmail.com", username: "irene", fullname: "Irene"},
    {roleId: 2, teamId: 1, email:"michael@gmail.com", username: "michael", fullname: "Michael"},
    {roleId: 2, teamId: 1, email:"dan@gmail.com", username: "dan", fullname: "Dan"},
    {roleId: 2, teamId: 1, email:"kal@gmail.com", username: "kal", fullname: "Kal"},
  ]);

  console.log("💡 Database: Migration successfully executed.")

}

seeder();
