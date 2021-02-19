import { Router, Request, Response, NextFunction } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import SeederService from '../../services/seeder';
const route = Router();

export default (app: Router) => {
  app.use('/seeder', route);

  route.get(
    '/regular', 
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      try
      {
        const seederServiceInstance = Container.get(SeederService);
        await seederServiceInstance.regularSeed();

        return res.json({status: "OK"}).status(200);
      }
      catch (e)
      {
        logger.error('🔥 error on seeder: %o', e);
        return next(e);
      }
    }
  );

  route.get(
    '/contacts', 
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      try
      {
        const seederServiceInstance = Container.get(SeederService);
        await seederServiceInstance.contactSeed();

        return res.json({status: "OK"}).status(200);
      }
      catch (e)
      {
        logger.error('🔥 error on seeder: %o', e);
        return next(e);
      }
    }
  );

};