import { AppoitmentRepository } from "../../../../data/appoitments-repository";
import { Appointment } from "../../../../models/appointment";
import { AppError } from "../../../../providers/AppError";
import { DateProvider } from "../../../../providers/Date";
import { TokenProvider } from "../../../../providers/Token";
import { UseCase } from "../../../../providers/UseCase";
import { ConfirmAppointmentDTO } from "../../dtos/confirm-appointment-dto";

type Response = AppError | Appointment

export class ConfirmAppointment implements UseCase<ConfirmAppointmentDTO, Response> {
    constructor(
        private appointmentRepository: AppoitmentRepository,
        private dateProvider: DateProvider,
        private tokenProvider: TokenProvider
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
        const isBefore = this.dateProvider.isBefore(appointmentDate, new Date())
        if (isBefore) {
            return new AppError('The appointment is invalid because it has already passed')
        }

        const activeToken = this.tokenProvider.getStaticToken()
        if (token != activeToken) {
            return new AppError('Provided token is invalid')
        }

        const confirmedAppointment = await this.appointmentRepository.confirm({ id: appointmentId })

        return confirmedAppointment
    }
}