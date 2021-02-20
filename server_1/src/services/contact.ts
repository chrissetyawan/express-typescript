import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import { IContact, IContactIO } from '../interfaces/Contact';
import JobService from './job';

@Service()
export default class ContactService {
  constructor(
    @Inject('ContactModel') private ContactModel: Models.ContactModel,
    @Inject('UserModel') private UserModel: Models.UserModel,
    @Inject('OfferModel') private OfferModel: Models.OfferModel,
    @Inject('logger') private logger: Logger,
    private job: JobService,
  ){}

  public async createContacts(dataContact: IContactIO): Promise<string> {

    try 
    {
      let { queue } = await this.job.getLastQueue();
      const ContactModel = this.ContactModel;
      const UserModel = this.UserModel;
      const OfferModel = this.OfferModel;
      const Logger = this.logger;
      const JobService = this.job;
      let team = [];
      let currentLeader = null;
      let countProcess = 0;

      // Sort data first to prevent called diffrent user on middle of current user
      dataContact.contacts.sort(function (a, b) {
        return a.userId - b.userId;
      });

      for(let i = 0; i < dataContact.contacts.length; i++)
      {
        const contact = dataContact.contacts[i];

        countProcess++;
        const user = await UserModel.findByPk(contact.userId);

        if(user.roleId === 1)
        {
          const insertedContact = await ContactModel.create(contact);

          if( team.length <= 0 || currentLeader != contact.userId)
          {
            team = await UserModel.findAll({
              attributes: ['*', [sequelize.fn('count', sequelize.col('userId')), 'offerCount']],
              include: [
                {
                  model: OfferModel,
                  attributes: [],
                  as: "offer"
                }
              ],
              order: sequelize.literal("RAND()"),
              where: {
                teamId: user.teamId, 
                roleId: {[Op.ne]: 1}
              },
              group: ['user.id'],
              raw: true
            });

            if(countProcess >= team.length) {
              countProcess = 0;
              queue++
            };

            currentLeader = contact.userId;
          }
  
          if(team.length > 0)
          {
            // Search for lowest offer member
            const lowestOfferMember = await team.reduce(function(prev, curr) {
              return prev.offerCount < curr.offerCount ? prev : curr;
            });

            const offerData = {
              userId: lowestOfferMember.id,
              contactId: insertedContact.id
            };

            await JobService.createJob({
              queue: queue,
              payload: JSON.stringify({
                handler: "offerHandler",
                data: offerData,
              })
            });

            Logger.info("Offer with contact id: %d send to team member with id: %d", offerData.contactId, offerData.userId);

            const index = team.indexOf(lowestOfferMember);
            if(index > -1) {
              team.splice(index, 1);
            }

          }
        }
      }

      return;
    }
    catch (e)
    {
      this.logger.error(e);
      throw e;
    }

  }

  public async getContacts(userId: string): Promise<{contacts: (IContact)[]}> {
    try 
    {
      this.logger.info('Collecting contacs record with id %s', userId);
      const contacts = await this.ContactModel.findAll({where: {userId: userId}});

      return { contacts };
    }
    catch (e)
    {
      this.logger.error(e);
      throw e;
    }
  }

}