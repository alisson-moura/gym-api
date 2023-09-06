import { Request, Response } from "express";
import { BaseController } from "../base-controller";
import { PrismaScheduleRepository } from "../../../database/schedule-repository";
import { DateStatus } from "../../../../modules/admin/date-status";

class DateStatusController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const date = req.query.date as unknown as Date
        const service = new DateStatus(new PrismaScheduleRepository())

        const result = await service.execute({date: new Date(date)})

        return this.ok(res, result)
    }
}

export default new DateStatusController()