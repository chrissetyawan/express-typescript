import OfferSequenceJob from '../jobs/offerSequence';
import Jobs from '../models/jobs.model';
import cron from 'node-cron';
import { Op } from 'sequelize';
import Logger from './logger';

export default () => {
  cron.schedule('* * * * *', async () => {
    
    Logger.info("⏰ Cronjob has executed!");

    const job : Jobs | null = await Jobs.findOne({
      order: [
        ['queue', 'ASC']
      ]
    })
    let queue = job ? job.queue : 1;
    
    Jobs.findAll({
      where: {
        availableAt: {[Op.lte]: new Date()},
        queue: queue
      }
    })
      .then(jobs => {
        
        jobs.forEach((jobs:Jobs) => {
          
          const payload = JSON.parse(jobs.payload)
          const data = payload.data;
  
          switch (payload.handler) {
            case "offerHandler": {
              new OfferSequenceJob().handler(data);
            }
            default:
              break;
          };

          Jobs.destroy({
            where: {id: jobs.id}
          });

        });
  
      });
  });
};