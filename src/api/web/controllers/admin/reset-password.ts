import { Request, Response } from "express";
import { ResetClientPassword } from "../../../../modules/admin/reset-password";
import { AppError } from "../../../../providers/AppError";
import { PrismaClientRepository } from "../../../database/client-repository";
import { EncrypterProvider } from "../../../providers/EncrypterProvider";
import { BaseController } from "../base-controller";


class ResetPasswordController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        const id = Number(req.params.id)

        const service = new ResetClientPassword(new PrismaClientRepository(), new EncrypterProvider())
        const result = await service.execute({ id, ...data })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }
}

export default new ResetPasswordController()