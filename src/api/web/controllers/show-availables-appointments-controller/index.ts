import { Request, Response } from "express";
import { ShowAvailableAppointments } from "../../../../modules/appointments/services/07-show-available-appointments";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { makeMonthPaymentService } from "../../../factories/month-payment";
import { DateFnsProvider } from "../../../providers/DateFnsProvider";
import { BaseController } from "../base-controller";

class ShowAvailableAppointmentsController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.query as any

        // Checks if there is payment for the requested date
        const hasPayment = await makeMonthPaymentService({ clientId: req.userId, date: data.date })
        if (hasPayment instanceof AppError) {
            return this.clientError(res, hasPayment.message)
        }

        const service = new ShowAvailableAppointments(new PrismaAppointmentRepository(), new DateFnsProvider())
        const result = await service.execute(data)
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res, result)
    }
}

export default new ShowAvailableAppointmentsController()