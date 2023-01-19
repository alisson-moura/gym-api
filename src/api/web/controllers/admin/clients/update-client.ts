import { Request, Response } from "express";
import { UpdateClient } from "../../../../../modules/admin/update-client";
import { AppError } from "../../../../../providers/AppError";
import { PrismaClientRepository } from "../../../../database/client-repository";
import { BaseController } from "../../base-controller";

class UpdateClientController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body

        const service = new UpdateClient(new PrismaClientRepository())
        const result = await service.execute(data)

        if (result instanceof AppError) {
            return this.clientError(res, result.message)
        }

        return this.ok(res, result)
    }
}

export default new UpdateClientController()