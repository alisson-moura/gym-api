import { AppoitmentRepository } from "../../../../data/appoitments-repository";
import { Appointment } from "../../../../models/appointment";
import { AppError } from "../../../../providers/AppError";
import { DateProvider } from "../../../../providers/Date";
import { UseCase } from "../../../../providers/UseCase";
import { CancelAppointmentDTO } from "../../dtos/cancel-appointment-dto";

type Response = AppError | Appointment

export class CancelAppointment implements UseCase<CancelAppointmentDTO, Response> {
    constructor(
        private appointmentRepository: AppoitmentRepository,
        private dateProvider: DateProvider
    ) { }
    async execute(request: CancelAppointmentDTO): Promise<Response> {
        const { appointmentId, clientId, comments } = request

        const appointment = await this.appointmentRepository.findById(appointmentId)
        if (appointment === undefined) {
            return new AppError('Invalid appointment id')
        }

        if (appointment.status != 'Pendente') {
            return new AppError('This appointment cannot be canceled')
        }


        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(appointment.hour)
        if (this.dateProvider.isBefore(appointmentDate, new Date())) {
            return new AppError('Past appointments cannot be canceled')
        }

        if (appointment.client && appointment.client.id != clientId) {
            return new AppError('This appointment does not belong to the informed customer')
        }

        const canceledAppointment = await this.appointmentRepository.cancel({
            id: appointmentId,
            comments
        })

        return canceledAppointment
    }
}