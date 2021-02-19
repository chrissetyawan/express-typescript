import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import { IContact } from '../interfaces/Contact';
import ContactService from './contact';

@Service()
export default class SeederService {
  constructor(
    @Inject('UserModel') private UserModel: Models.UserModel,
    @Inject('RoleModel') private RoleModel: Models.RoleModel,
    @Inject('TeamModel') private TeamModel: Models.TeamModel,
    @Inject('logger') private logger: Logger,
    private contact: ContactService,
  ){}

  public async regularSeed() {
    try 
    {
      await this.RoleModel.bulkCreate([
        {name: "Leader"},
        {name: "Member"},
      ]);
      
      await this.TeamModel.bulkCreate([
        {name: "Eagle Team"}
      ]);
      
      await this.UserModel.bulkCreate([
        {roleId: 1, teamId: 1, email:"nicole@gmail.com", username: "nicole", fullname: "Nicole"},
        {roleId: 2, teamId: 1, email:"irene@gmail.com", username: "irene", fullname: "Irene"},
        {roleId: 2, teamId: 1, email:"michael@gmail.com", username: "michael", fullname: "Michael"},
        {roleId: 2, teamId: 1, email:"dan@gmail.com", username: "dan", fullname: "Dan"},
        {roleId: 2, teamId: 1, email:"kal@gmail.com", username: "kal", fullname: "Kal"},
      ]);

      this.logger.info('Seeder has been executed successfully');
    }
    catch (e)
    {
      this.logger.error(e);
      throw e;
    }
  }

  public async contactSeed() {
    try 
    {
      const contacts: IContact[] = [
        { "name": "Name1", "email": "email1@com.com", "phone": "0842", "userId": 1 },
        { "name": "Name1", "email": "email1@com.com", "phone": "0842", "userId": 1 },
        { "name": "Name1", "email": "email1@com.com", "phone": "0842", "userId": 1 },
        { "name": "Name1", "email": "email1@com.com", "phone": "0842", "userId": 1 },
        { "name": "Name1", "email": "email1@com.com", "phone": "0842", "userId": 1 }
      ]

      await this.contact.createContacts({contacts: contacts});

      this.logger.info('Seeder has been executed successfully');
    }
    catch (e)
    {
      this.logger.error(e);
      throw e;
    }
  }

}