import { Request, Response } from "express";
import { UpdateStatusAppointment } from "../../../../modules/admin/update-appointment";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { BaseController } from "../base-controller";


class UpdateStatusAppointmentController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id)
        const { status } = req.body

        if(!status) {
            return this.clientError(res, 'Status é obrigatório.')
        }

        const service = new UpdateStatusAppointment(new PrismaAppointmentRepository())
        const result = await service.execute({ id, status })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }
}

export default new UpdateStatusAppointmentController()