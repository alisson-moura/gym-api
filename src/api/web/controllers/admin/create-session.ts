import { Request, Response } from "express";
import { CreateSession } from "../../../../modules/admin/create-session";
import { AppError } from "../../../../providers/AppError";
import { PrismaAdminRepository } from "../../../database/admin-repository";
import { EncrypterProvider } from "../../../providers/EncrypterProvider";
import { JwtTokenProvider } from "../../../providers/JwtTokenProvider";
import { BaseController } from "../base-controller";


class CreateSessionController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        const createSessionService = new CreateSession(new PrismaAdminRepository(), new JwtTokenProvider(), new EncrypterProvider())
        const result = await createSessionService.execute(data)
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }

}

export default new CreateSessionController()