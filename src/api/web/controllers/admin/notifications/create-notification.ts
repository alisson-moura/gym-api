import { Request, Response } from "express";
import { CreateNotification } from "../../../../../modules/admin/Notifications/create-notification";
import { PrismaClientRepository } from "../../../../database/client-repository";
import { PrismaNotificationsRepository } from "../../../../database/notifications-repository";
import { BaseController } from "../../base-controller";

class CreateNotificationController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        const files = req.files as Express.Multer.File[]

        if (files.length > 0) {
            data.files = files.map(file => file.filename)
        }

        const service = new CreateNotification(new PrismaNotificationsRepository(), new PrismaClientRepository())
        const result = await service.execute(data)

        return this.ok(res, result)
    }
}

export default new CreateNotificationController()