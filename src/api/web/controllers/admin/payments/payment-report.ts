import { Request, Response } from "express";
import { PaymentReportService } from "../../../../../modules/Payments/payment-report"
import { PrismaPaymentRepository } from "../../../../database/payments-repository";
import { DateFnsProvider } from "../../../../providers/DateFnsProvider";
import { BaseController } from "../../base-controller";

class PaymentReportController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const startDate = req.query.startDate as string
        const endDate = req.query.endDate as string

        if (startDate == null || endDate == null) {
            return this.clientError(res, 'Invalid dates')
        }

        const service = new PaymentReportService({ paymentRepository: new PrismaPaymentRepository(), dateProvider: new DateFnsProvider() })
        const result = await service.execute({ endDate: endDate, startDate: startDate })

        return this.ok(res, result)
    }
}

export default new PaymentReportController()