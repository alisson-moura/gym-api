import { prisma } from "../../../database";
import { Request, Response } from "express";
import { BaseController } from "../base-controller";

class ListMuscleGroupController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const items = await prisma.muscleGroup.findMany()
        return this.ok(res, items)
    }

}

export default new ListMuscleGroupController()