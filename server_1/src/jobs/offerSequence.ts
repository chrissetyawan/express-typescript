  
import { Container } from 'typedi';
import OfferService from '../services/offer';
import { Logger } from 'winston';
import { SendIOffer } from '../interfaces/Offer';

export default class OfferSequenceJob {

  public async handler(data: SendIOffer): Promise<void> {
    const Logger: Logger = Container.get('logger');
    try {
      
      Logger.debug('📁 Offer Sequence Job triggered!');
      const offerServiceInstance = Container.get(OfferService);
      await offerServiceInstance.sendOffer(data);
    } catch (e) {
      Logger.error('🔥 Error with Offer Sequence Job: %o', e);
    }
  }

}