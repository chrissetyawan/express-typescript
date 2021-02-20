import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
import { IOffer, SendIOffer } from '../interfaces/Offer';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class OfferService {
  constructor(
    @Inject('OfferModel') private OfferModel: Models.OfferModel,
    @Inject('logger') private logger: Logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ){}

  public async sendOffer(offerData: SendIOffer): Promise<{ offer: IOffer }> {
    
    try 
    {
      const offerRecord = await this.OfferModel.create({
        userId: offerData.userId,
        contactId: offerData.contactId,
      })

      if (!offerRecord) {
        throw new Error('Offer cannot be created');
      }

      this.logger.silly('Sending offer notifictication');
      this.eventDispatcher.dispatch(events.offer.offerSended, offerRecord);
      
      return { offer: offerRecord };
    }
    catch (e)
    {
      this.logger.error(e);
      throw e;
    }
  }

}