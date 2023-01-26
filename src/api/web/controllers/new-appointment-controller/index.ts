import { Request, Response } from "express";
import { NewAppointment } from "../../../../modules/appointments/services/08-new-appointment";
import { MonthPaymentService } from "../../../../modules/Payments/month-payment";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { PrismaClientRepository } from "../../../database/client-repository";
import { PrismaPaymentRepository } from "../../../database/payments-repository";
import { makeMonthPaymentService } from "../../../factories/month-payment";
import { DateFnsProvider } from "../../../providers/DateFnsProvider";
import { BaseController } from "../base-controller";
;

class NewAppointmentController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body

        // Checks if there is payment for the requested date
        const hasPayment = await makeMonthPaymentService({ clientId: data.clientId, date: data.date })
        if (hasPayment instanceof AppError) {
            return this.clientError(res, hasPayment.message)
        }

        const service = new NewAppointment(
            new PrismaAppointmentRepository(),
            new PrismaClientRepository(),
            new DateFnsProvider()
        )
        const result = await service.execute(data)
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res)
    }

}

export default new NewAppointmentController()