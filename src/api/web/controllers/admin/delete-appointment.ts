import { Request, Response } from "express";
import { DeleteAppointment } from "../../../../modules/admin/delete-appointment";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { BaseController } from "../base-controller";


class DeleteAppointmentController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id)

        const service = new DeleteAppointment(new PrismaAppointmentRepository())
        const result = await service.execute({ appointmentId: id })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res)
    }
}

export default new DeleteAppointmentController()