import { Request, Response } from "express";
import { ListAllNotification } from "../../../../../modules/admin/Notifications/list-all-notifications";
import { PrismaNotificationsRepository } from "../../../../database/notifications-repository";
import { BaseController } from "../../base-controller";

class ListNotificationController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {       
        const queryPage = req.query.page as any

        const service = new ListAllNotification(new PrismaNotificationsRepository())
        const result = await service.execute({page: queryPage})

        return this.ok(res, result)
    }
}

export default new ListNotificationController()