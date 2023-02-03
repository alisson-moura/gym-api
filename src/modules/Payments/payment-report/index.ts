import { PaymentsRepository } from "../../../data/payments-repository"
import { Payment } from "../../../models/Payment"
import { DateProvider } from "../../../providers/Date"
import { UseCase } from "../../../providers/UseCase"

type Response = {
    payments: Payment[]
    total: number
    startDate: Date
    endDate: Date
    createdAt: Date
    amount: number
}

type Request = {
    startDate: string
    endDate: string
}

export class PaymentReportService implements UseCase<Request, Response> {
    private paymentRepository: PaymentsRepository
    private dateProvider: DateProvider

    constructor(providers: { paymentRepository: PaymentsRepository, dateProvider: DateProvider }) {
        this.paymentRepository = providers.paymentRepository
        this.dateProvider = providers.dateProvider
    }

    async execute(request: Request): Promise<Response> {
        const { startDate, endDate } = request
        const [start, end] = [
            new Date(startDate),
            this.dateProvider.addOneDay(new Date(endDate))
        ]
        const payments = await this.paymentRepository.searchForPeriod({ startDate: start, endDate: end })
        const total = payments.length
        const amount = payments.reduce((acc, item) => acc + item.getValue(), 0)

        return { payments, total, startDate: start, endDate: new Date(endDate), createdAt: new Date(), amount }
    }
}