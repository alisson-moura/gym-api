import { Request, Response } from "express";
import { DeleteNotification } from "../../../../../modules/admin/Notifications/delete-notification";
import { AppError } from "../../../../../providers/AppError";
import { PrismaNotificationsRepository } from "../../../../database/notifications-repository";
import { BaseController } from "../../base-controller";

class DeleteNotificationController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {       
        const id = Number(req.params.id)

        const service = new DeleteNotification(new PrismaNotificationsRepository())
        const result = await service.execute({id})

        if (result instanceof AppError) {
            return this.clientError(res, result.message)
        }

        return this.ok(res, result)
    }
}

export default new DeleteNotificationController()