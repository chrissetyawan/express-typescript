import { Transaction } from 'sequelize/types';
import { Service, Inject } from 'typedi';
import { Logger } from 'winston';

@Service()
export default class JobService {
  constructor(
    @Inject('JobModel') private JobModel: Models.JobModel,
    @Inject('logger') private logger: Logger,
  ){}

  public async createJob(job: { queue: number, payload: string, }, transaction: Transaction): Promise<{created: number, status: string}> {
    try 
    {
      const jobRecord = await this.JobModel.create(job, {transaction: transaction})
      if (!jobRecord) {
        throw new Error('Job cannot be created');
      }
      return { created: jobRecord.id, status: "OK" };
    }
    catch (e)
    {
      this.logger.error(e);
      throw e;
    }
  }

  public async getLastQueue(): Promise<{queue: number}> {
    try
    {
      const jobRecord = await this.JobModel.findOne({
        order: [
          ['queue', 'DESC']
        ]
      });
      const queue = jobRecord ? jobRecord.queue + 1 : 1;
      return { queue };
    }
    catch (e)
    {
      this.logger.error(e);
      throw e;
    }
  }

}