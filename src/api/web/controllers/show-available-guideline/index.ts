import { Request, Response } from "express";
import { prisma } from "../../../database";
import { BaseController } from "../base-controller";

class ShowGuideLineController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const guide = await prisma.guidelines.findFirst({ where: { isActive: true } })
        if (guide === null) {
            return this.fail(res, new Error('No guideline available'))
        }
        return this.ok(res, guide)
    }

}

export default new ShowGuideLineController()