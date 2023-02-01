import { ClientRepository } from "../../../data/client-repository"
import { PaymentsRepository } from "../../../data/payments-repository"
import { Client } from "../../../models/client"
import { Payment } from "../../../models/Payment"
import { AppError } from "../../../providers/AppError"
import { DateProvider } from "../../../providers/Date"
import { UseCase } from "../../../providers/UseCase"

type Response = {
    payment: Payment | null
} | AppError

type Request = {
    clientId: number
    month: Date
}

/**
 *  Serviço que verifica a existência de um pagamento para data solicitada
 * Onde pode ser usado ?
 * [x] No momento em que um aluno solicita um agendamento
 * [x] No momento em que o aluno solicita os horarios disponiveís
 * [ ] No momento em que o admin tenta criar um agendamento pro aluno
 */

export class MonthPaymentService implements UseCase<Request, Response> {
    private dateProvider: DateProvider
    private paymentRepository: PaymentsRepository
    private clientRepository: ClientRepository
    private payDay: number = 11

    constructor(providers: { dateProvider: DateProvider, paymentRepository: PaymentsRepository, clientRepository: ClientRepository }) {
        this.dateProvider = providers.dateProvider
        this.paymentRepository = providers.paymentRepository
        this.clientRepository = providers.clientRepository
    }

    async execute(request: Request): Promise<Response> {
        const { month, clientId } = request

        const dateMonth = new Date(month)
        const isBeforePayday = this.dateProvider.isBefore(dateMonth, this.dateProvider.setDate({ day: this.payDay, month: dateMonth.getMonth(), year: dateMonth.getFullYear() }))
        const date = this.dateProvider.dateByMonthAndYear({ month: dateMonth.getMonth(), year: dateMonth.getFullYear() })
        const prevDate = this.dateProvider.prevMonth(date)

        const client = await this.clientRepository.findById({ id: clientId, password: false })
        if (client == undefined || client == null) return new AppError('Cliente não encontrado.')

        if (client.group.paying == false) {
            return { payment: null }
        }

        const payment = await this.paymentRepository.findPayment({ clientId, month: date })
        if (payment == null) {
            if (isBeforePayday) {
                // Válido para o mês de fevereiro de 2023 - TODO: remover logo após o mês terminar
                if (date.getMonth() == 1) {
                    return { payment: null }
                }

                const prevPayment = await this.paymentRepository.findPayment({ clientId, month: prevDate })
                if (prevPayment) {
                    return { payment }
                }
            }
            return new AppError('Nenhum pagamento encontrado para o data solicitada.')
        }
        return { payment }
    }
}

