import { Request, Response } from "express";
import { CancelAppointment } from "../../../../modules/appointments/services/09-cancel-appointment";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { DateFnsProvider } from "../../../providers/DateFnsProvider";
import { BaseController } from "../base-controller";
;

class CancelAppointmentController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        console.log(data)
        const service = new CancelAppointment(
            new PrismaAppointmentRepository(),
            new DateFnsProvider()
        )
        const result = await service.execute(data)
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res)
    }

}

export default new CancelAppointmentController()