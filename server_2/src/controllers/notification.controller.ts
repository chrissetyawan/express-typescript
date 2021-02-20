import { Request, Response } from "express";
import { Notification } from "../models/notification.model";

export class NotificationController 
{
  public async create(req: Request, res: Response) {
    const param: Notification = req.body;
    
    Notification.create<Notification>(param)
      .then(() => res.json({"status": "OK"}))
      .catch((err) => res.json({"status": "Err", "message": err}).status(401));
  }
}