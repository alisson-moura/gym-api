import { prisma } from "../../../database";
import { Request, Response } from "express";
import { BaseController } from "../base-controller";

class ListExercisesController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id)
        
        const items = await prisma.exercises.findMany({ where: { groupId: id } })
        return this.ok(res, items)
    }

}

export default new ListExercisesController()