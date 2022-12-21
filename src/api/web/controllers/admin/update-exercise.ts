import { Request, Response } from "express";
import { unlink } from 'node:fs/promises';
import { UpdateExercise } from "../../../../modules/admin/update-exercise";
import { AppError } from "../../../../providers/AppError";
import { PrismaExerciseRepository } from "../../../database/exercises-repository";
import { BaseController } from "../base-controller";

class UpdateExerciseController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        if (req.file)
            data.cover = req.file?.filename

        data.id = Number(data.id)
        const service = new UpdateExercise(new PrismaExerciseRepository())
        const result = await service.execute(data)

        if (result instanceof AppError) {
            if (req.file)
                await unlink(req.file.path);
            return this.clientError(res, result.message)
        }

        return this.ok(res, result)
    }
}

export default new UpdateExerciseController()