import { Request, Response } from "express";
import { CreateSession } from "../../../modules/clients/services/02-create-session";
import { AppError } from "../../../providers/AppError";
import { PrismaClientRepository } from "../../database/client-repository";
import { JwtTokenProvider } from "../../providers/JwtTokenProvider";
import { BaseController } from "./base-controller";

class CreateSessionController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        const createSessionService = new CreateSession(new PrismaClientRepository(), new JwtTokenProvider())
        const result = await createSessionService.execute(data)
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }

}

export default new CreateSessionController()