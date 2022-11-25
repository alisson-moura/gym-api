import { Request, Response } from "express";
import { AcceptTerm } from "../../../../modules/clients/services/accept-term";
import { AppError } from "../../../../providers/AppError";
import { PrismaClientRepository } from "../../../database/client-repository";
import { PrismaTermRepository } from "../../../database/term-repository";
import { BaseController } from "../base-controller";

class AcceptTermController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const termId = parseInt(req.params.termId)
        const clientId = req.userId

        if (!termId || !clientId) {
            return this.clientError(res, 'invalid user or id')
        }

        const service = new AcceptTerm(
            new PrismaClientRepository(),
            new PrismaTermRepository())

        const result = await service.execute({ clientId, termId })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res)
    }

}
export default new AcceptTermController()