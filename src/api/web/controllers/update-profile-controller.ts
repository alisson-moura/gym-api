import { Request, Response } from "express";
import { UpdateAccount } from "../../../modules/clients/services/04-update-profile";
import { AppError } from "../../../providers/AppError";
import { PrismaClientRepository } from "../../database/client-repository";
import { BaseController } from "./base-controller";

class UpdateProfileController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const service = new UpdateAccount(new PrismaClientRepository())
        const result = await service.execute({ id: req.userId, ...req.body })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }

}

export default new UpdateProfileController()