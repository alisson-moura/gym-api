import { Request, Response } from "express";
import { CreateSession } from "../../../modules/clients/services/02-create-session";
import { ReadNotification } from "../../../modules/clients/services/read-notification";
import { AppError } from "../../../providers/AppError";
import { PrismaClientRepository } from "../../database/client-repository";
import { EncrypterProvider } from "../../providers/EncrypterProvider";
import { JwtTokenProvider } from "../../providers/JwtTokenProvider";
import { BaseController } from "./base-controller";

class ReadNotificationController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const clientId = req.userId
        const service = new ReadNotification(new PrismaClientRepository())
        await service.execute({ clientId })
        return this.ok(res)
    }

}

export default new ReadNotificationController()