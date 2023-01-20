import { Request, Response } from "express";
import { RegisterPaymentService } from "../../../../../modules/Payments/register-payment";
import { PrismaClientRepository } from "../../../../database/client-repository";
import { PrismaPaymentRepository } from "../../../../database/payments-repository";
import { DateFnsProvider } from "../../../../providers/DateFnsProvider";
import { BaseController } from "../../base-controller";

class RegisterPaymentController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body

        const service = new RegisterPaymentService({
            clientRepository: new PrismaClientRepository(),
            dateProvider: new DateFnsProvider(),
            paymentRepository: new PrismaPaymentRepository()
        })

        const result = await service.execute(data)

        return this.ok(res, result)
    }
}

export default new RegisterPaymentController()