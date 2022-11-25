import { Request, Response } from "express";
import { ShowTerm } from "../../../../modules/clients/services/show-term";
import { AppError } from "../../../../providers/AppError";
import { PrismaTermRepository } from "../../../database/term-repository";
import { BaseController } from "../base-controller";

class ShowTermController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const id = parseInt(req.params.id)
        const service = new ShowTerm(new PrismaTermRepository())
        const result = await service.execute({ id })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }

}

export default new ShowTermController()