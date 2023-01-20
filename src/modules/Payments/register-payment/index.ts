import { ClientRepository } from "../../../data/client-repository"
import { PaymentsRepository } from "../../../data/payments-repository"
import { Payment } from "../../../models/Payment"
import { AppError } from "../../../providers/AppError"
import { DateProvider } from "../../../providers/Date"
import { UseCase } from "../../../providers/UseCase"
import { RegisterPaymentDTO } from "./dto"


type Response = {
    payment: Payment
} | AppError

export class RegisterPaymentService implements UseCase<RegisterPaymentDTO, Response> {
    private clientRepository: ClientRepository
    private dateProvider: DateProvider
    private paymentRepository: PaymentsRepository

    constructor(providers: { clientRepository: ClientRepository, dateProvider: DateProvider, paymentRepository: PaymentsRepository }) {
        this.clientRepository = providers.clientRepository
        this.dateProvider = providers.dateProvider
        this.paymentRepository = providers.paymentRepository
    }

    async execute(request: RegisterPaymentDTO): Promise<Response> {
        const { cardNumber, clientId, month, value, year } = request

        const client = await this.clientRepository.findById({ id: clientId, password: false })
        if (client == undefined) { return new AppError('Aluno inválido ou não encontrado') }

        if ((month > 11 || month < 0) || year < 2020) { return new AppError('Data da mensalidade é inválida') }
        const monthOfPayment = this.dateProvider.dateByMonthAndYear({ month, year })

        const customerPaymentsForThisMonth = await this.paymentRepository.findPayment({ month: monthOfPayment, clientId: client.id! })
        if (customerPaymentsForThisMonth != null) { return new AppError('Já existe um pagamento deste cliente para o mês informado') }

        const monthlyPayment = await this.paymentRepository.monthlyPayment()
        if (value != monthlyPayment) { return new AppError('Valor da mensalidade não corresponde com o valor da mensalidade atual.') }

        const paymentRequest = new Payment({ cardNumber, value, client, month: monthOfPayment })
        const payment = await this.paymentRepository.register(paymentRequest)

        return { payment }
    }
}