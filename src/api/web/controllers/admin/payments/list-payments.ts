import { Request, Response } from "express";
import { ListPaymentsService } from "../../../../../modules/Payments/list-all-payments";
import { PrismaPaymentRepository } from "../../../../database/payments-repository";
import { DateFnsProvider } from "../../../../providers/DateFnsProvider";
import { BaseController } from "../../base-controller";

class ListPaymentsController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.query

        const service = new ListPaymentsService({
            dateProvider: new DateFnsProvider(),
            paymentRepository: new PrismaPaymentRepository()
        })

        const result = await service.execute(data)

        return this.ok(res, result)
    }
}

export default new ListPaymentsController()