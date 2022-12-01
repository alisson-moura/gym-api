import { Request, Response } from "express";
import { ShowProfile } from "../../../modules/clients/services/03-show-profile";
import { AddProfilePhoto } from "../../../modules/clients/services/add-photo";
import { AppError } from "../../../providers/AppError";
import { PrismaClientRepository } from "../../database/client-repository";
import { BaseController } from "./base-controller";

class AddProfilePhotoController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const clientId = req.userId
        const filename = req.file?.filename

        if (!filename) {
            return this.fail(res, 'Erro ao enviar arquivo.')
        }

        const service = new AddProfilePhoto(new PrismaClientRepository())
        const result = await service.execute({ clientId, filename })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }

}

export default new AddProfilePhotoController()