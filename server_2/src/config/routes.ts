import { application, Request, Response } from "express";
import { NotificationController } from "../controllers/notification.controller";
require('dotenv').config();

export class Routes {
  public notificationController: NotificationController = new NotificationController();

  public routes(app: any): void {
    const prefix = process.env.API_PREFIX || "/api";

    app.route(prefix).get(function (req: Request, res: Response) {
      res.json({
        "status": "OK",
        "message": "Welcome to our API services!"
      })
    });

    app.route(prefix+"/notification").post(this.notificationController.create);
  }
}