import { Request, Response } from "express";
import { ConfirmAppointment } from "../../../../modules/appointments/services/10-confirm-appointment";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { DateFnsProvider } from "../../../providers/DateFnsProvider";
import { JwtTokenProvider } from "../../../providers/JwtTokenProvider";
import { BaseController } from "../base-controller";
;

class ConfirmAppointmentController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        const service = new ConfirmAppointment(
            new PrismaAppointmentRepository(),
            new DateFnsProvider(),
            new JwtTokenProvider()
        )
        const result = await service.execute(data)
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res)
    }

}
export default new ConfirmAppointmentController()