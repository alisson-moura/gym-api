import { number } from "joi";
import { Payment } from "../../models/Payment";
import { MonthPaymentService } from "../../modules/Payments/month-payment";
import { AppError } from "../../providers/AppError";
import { PrismaClientRepository } from "../database/client-repository";
import { PrismaPaymentRepository } from "../database/payments-repository";
import { DateFnsProvider } from "../providers/DateFnsProvider";

type Response = {
    payment: Payment | null
} | AppError

export const makeMonthPaymentService = async ({ clientId, date }: { clientId: number, date: Date }): Promise<Response> => {
    const monthPaymentService = new MonthPaymentService({
        clientRepository: new PrismaClientRepository(),
        dateProvider: new DateFnsProvider(),
        paymentRepository: new PrismaPaymentRepository()
    })
    const hasPayment = await monthPaymentService.execute({ clientId, month: date })
    return hasPayment
}