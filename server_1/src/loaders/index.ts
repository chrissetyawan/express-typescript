import expressLoader from './express';
import express from 'express';
import dependencyInjectorLoader from './dependencyInjector';
import jobsLoader from './jobs';
import Logger from './logger';
import './events';

export default async (expressApp: express.Application) => {

  const userModel = {
    name: 'UserModel',
    model: require('../models/user.model').default,
  };

  const offerModel = {
    name: 'OfferModel',
    model: require('../models/offers.model').default,
  };

  const contactModel = {
    name: 'ContactModel',
    model: require('../models/contact.model').default,
  };

  const jobModel = {
    name: 'JobModel',
    model: require('../models/jobs.model').default,
  };

  const teamModel = {
    name: 'TeamModel',
    model: require('../models/team.model').default,
  };

  const roleModel = {
    name: 'RoleModel',
    model: require('../models/role.model').default,
  };

  await dependencyInjectorLoader([
    userModel,
    offerModel,
    contactModel,
    teamModel,
    roleModel,
    jobModel
  ]);

  Logger.info('💉 Dependency Injector loaded');
  

  await jobsLoader();
  Logger.info('📡 Jobs loaded');

  await expressLoader({ app: expressApp });
  
  Logger.info('👻 Express loaded');
};