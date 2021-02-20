import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { IOffer, SendIOffer } from '../interfaces/Offer';
import sequelize from 'sequelize';
import { Logger } from 'winston';
import axios from 'axios';
import config from '../config';
import Contact from '../models/contact.model';
import { IContact } from '../interfaces/Contact';

@EventSubscriber()
export default class OfferSubscriber {

  @On(events.offer.offerSended)
  public async onOfferSended(offer: IOffer) {
    const Logger: Logger = Container.get('logger');

    console.log("OFFER : %o", offer);

    try {
      const ContactModel = Container.get('ContactModel') as sequelize.ModelCtor<Contact & IContact>;

      const contact = await ContactModel.findByPk(offer.contactId);

      Logger.info("%o", offer.contactId);

      const data = {
        name: contact?.name,
        email: contact?.email,
        phone: contact?.phone,
        sender: contact?.userId,
        target: offer.userId,
      }

      axios
      .post(config.mock_api+"/notification", data)
      .then(res => {
        if(res.status == 200) {
          Logger.info(`🔦 Successfully post to notification on server 2: ${JSON.stringify(res.data)}`);
        }
      })
      .catch(err => Logger.error(`🔥 Error while sending to mock API %s`, err))

      
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.offer.offerSended}: %o`, e);
      throw e;
    }
  }
}