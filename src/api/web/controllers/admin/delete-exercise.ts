import { Request, Response } from "express";
import { DeleteExercise } from "../../../../modules/admin/delete-exercise";
import { AppError } from "../../../../providers/AppError";
import { PrismaExerciseRepository } from "../../../database/exercises-repository";
import { BaseController } from "../base-controller";

class DeleteExerciseController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id)

        const service = new DeleteExercise(new PrismaExerciseRepository())
        const result = await service.execute({ id })

        if (result instanceof AppError) {
            return this.clientError(res, result.message)
        }

        return this.ok(res, result)
    }
}

export default new DeleteExerciseController()