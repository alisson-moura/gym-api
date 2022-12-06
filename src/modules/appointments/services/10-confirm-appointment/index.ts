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
            return new AppError('Invalid appointment id')
        }

        if (appointment.client && appointment.client.id != clientId) {
            return new AppError('Invalid client id')
        }

        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(appointment.hour)
        const diffInHours = this.dateProvider.differenceInHours(appointmentDate, new Date())
        if (diffInHours > 0) {
            return new AppError('The appointment is invalid because it has already passed')
        }

        const activeToken = await this.tokenRepository.find()
        if (!activeToken) {
            return new AppError('An unexpected error')
        }
        if (token != activeToken.token) {
            return new AppError('Provided token is invalid')
        }

        const confirmedAppointment = await this.appointmentRepository.confirm({ id: appointmentId })

        return confirmedAppointment
    }
}