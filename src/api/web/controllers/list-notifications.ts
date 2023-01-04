import { Request, Response } from "express";
import { ListNotification } from "../../../modules/clients/services/list-notifications";
import { PrismaNotificationsRepository } from "../../database/notifications-repository";
import { BaseController } from "./base-controller";

class ListNotificationController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {       
        const queryPage = req.query.page as any

        const service = new ListNotification(new PrismaNotificationsRepository())
        const result = await service.execute({page: queryPage})

        return this.ok(res, result)
    }
}

export default new ListNotificationController()