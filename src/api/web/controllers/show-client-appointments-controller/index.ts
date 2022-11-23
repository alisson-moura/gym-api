import { Request, Response } from "express";
import { ShowClientAppointments } from "../../../../modules/appointments/services/05-show-client-appointments";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { BaseController } from "../base-controller";

class ShowClientAppointmentsController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.userId
        const service = new ShowClientAppointments(new PrismaAppointmentRepository())
        const result = await service.execute({ id: data })
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }

}

export default new ShowClientAppointmentsController()