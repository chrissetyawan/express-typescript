import { Router, Request, Response, NextFunction } from 'express';
import {celebrate, Joi} from 'celebrate';
import { Logger } from 'winston';
import { Container } from 'typedi';
import ContactService from '../../services/contact';
import { IContactIO } from '../../interfaces/Contact';
const route = Router();

export default (app: Router) => {
  app.use('/contact', route);

  route.post(
    '/', 
    celebrate({
      body: Joi.object({
        contacts: Joi.array().items({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          phone: Joi.string().required(),
          userId: Joi.number().required(),
        })
      }),
    }), 
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      try
      {
        const contactServiceInstance = Container.get(ContactService);
        await contactServiceInstance.createContacts(req.body as IContactIO);

        return res
          .json({status: "OK"})
          .status(200);
      }
      catch (e)
      {
        logger.error('🔥 error on contact: %o', e);
        return res
          .json({status: "NotOK", message: e.original.message})
          .status(400);
      }
    }
  );

  route.get(
    '/:id', 
    async (req: Request, res: Response, next: NextFunction) => {
      const logger:Logger = Container.get('logger');
      logger.debug('Calling create contact endpoint with body: %o', req.body );
      try
      {
        const contactServiceInstance = Container.get(ContactService);
        const contacts = await contactServiceInstance.getContacts(req.params.id);

        return res.json({ status: "OK", contacts }).status(200);
      }
      catch (e)
      {
        logger.error('🔥 error on contact: %o', e);
        return next(e);
      }
    }
  );
};