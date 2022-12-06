import { Request, Response } from "express";
import { PrismaAdminRepository } from "../../../database/admin-repository";
import { BaseController } from "../base-controller";

class ShowStatisticsController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const repository = new PrismaAdminRepository()
        const data = await repository.statistics()

        return this.ok(res, data)
    }
}

export default new ShowStatisticsController()