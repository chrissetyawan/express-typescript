import express from 'express';
import routes from '../api';
import config from '../config';

export default ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    res.json({
      "status": "NotFound"
    })
  });
};