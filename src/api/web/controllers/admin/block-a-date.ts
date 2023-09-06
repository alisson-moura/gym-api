import { Request, Response } from "express";
import { BaseController } from "../base-controller";
import { BlockDate } from "../../../../modules/admin/block-a-date";
import { PrismaScheduleRepository } from "../../../database/schedule-repository";

class BlockDateController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        const service = new BlockDate(new PrismaScheduleRepository())

        await service.execute(data)

        return this.ok(res)
    }
}

export default new BlockDateController()