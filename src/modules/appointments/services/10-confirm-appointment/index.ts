import { AppoitmentRepository } from "../../../../data/appoitments-repository";
import { PresenceTokenRepository } from "../../../../data/presence-token-repository";
import { Appointment } from "../../../../models/appointment";
import { AppError } from "../../../../providers/AppError";
import { DateProvider } from "../../../../providers/Date";
import { UseCase } from "../../../../providers/UseCase";
import { ConfirmAppointmentDTO } from "../../dtos/confirm-appointment-dto";

type Response = AppError | Appointment

export class ConfirmAppointment implements UseCase<ConfirmAppointmentDTO, Response> {
    constructor(
        private appointmentRepository: AppoitmentRepository,
        private tokenRepository: PresenceTokenRepository,
        private dateProvider: DateProvider,
    ) { }
    async execute(request: ConfirmAppointmentDTO): Promise<Response> {
        const { appointmentId, clientId, token } = request

        const appointment = await this.appointmentRepository.findById(appointmentId)
        if (appointment === undefined) {
            return new AppError('Agendamento não encontrado.')
        }

        if (appointment.client && appointment.client.id != clientId) {
            return new AppError('Aluno(a) não encontrado.')
        }

        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(appointment.hour)
        const diffInHours = this.dateProvider.differenceInHours(appointmentDate, new Date())
        if (diffInHours > 0) {
            return new AppError('Não é possível confirmar agendamentos que já passaram.')
        }

        const activeToken = await this.tokenRepository.find()
        if (!activeToken) {
            return new AppError('Erro inesperado', 500)
        }
        if (token != activeToken.token) {
            return new AppError('Token fornecido é inválido')
        }

        const confirmedAppointment = await this.appointmentRepository.confirm({ id: appointmentId })

        return confirmedAppointment
    }
}