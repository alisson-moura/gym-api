import { PaymentsRepository } from "../../../data/payments-repository"
import { Payment } from "../../../models/Payment"
import { DateProvider } from "../../../providers/Date"
import { UseCase } from "../../../providers/UseCase"

type Response = {
    payments: Payment[],
    total: number,
    page: number
}

type Request = {
    clientId?: number
    page?: number
    badge?: number
    month?: Date
}

export class ListPaymentsService implements UseCase<Request, Response> {
    private dateProvider: DateProvider
    private paymentRepository: PaymentsRepository

    constructor(providers: { dateProvider: DateProvider, paymentRepository: PaymentsRepository }) {
        this.dateProvider = providers.dateProvider
        this.paymentRepository = providers.paymentRepository
    }

    async execute(request: Request): Promise<Response> {
        const page = request.page || 1
        const { badge, clientId, month } = request

        if (clientId != undefined) {
            const { payments, total } = await this.paymentRepository.findByClient({ clientId, page })
            return { payments, page, total }
        }

        if (badge && !isNaN(badge)) {
            const { payments, total } = await this.paymentRepository.findByBadge({ badge, page })
            return { payments, page, total }
        }

        if (month) {
            const date = this.dateProvider.dateByMonthAndYear({ month: month.getMonth(), year: month.getFullYear() })
            const { payments, total } = await this.paymentRepository.findByMonth({ month: date, page })
            return { payments, page, total }
        }

        return { payments: [], page, total: 0 }
    }
}