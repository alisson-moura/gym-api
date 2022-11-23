import { Request, Response } from "express";
import { ShowProfile } from "../../../modules/clients/services/03-show-profile";
import { AppError } from "../../../providers/AppError";
import { PrismaClientRepository } from "../../database/client-repository";
import { BaseController } from "./base-controller";

class ShowProfileController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.userId
        const showProfileService = new ShowProfile(new PrismaClientRepository())
        const result = await showProfileService.execute({ id: data })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }

}

export default new ShowProfileController()