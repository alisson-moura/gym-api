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
            return new AppError('Agendamento não encontrado.')
        }

        if (appointment.status != 'Pendente') {
            return new AppError('Este agendamento não pode ser cancelado.')
        }


        const appointmentDate = new Date(appointment.date)
        appointmentDate.setHours(appointment.hour)
        if (this.dateProvider.isBefore(appointmentDate, new Date())) {
            return new AppError('Agendamentos passados não podem ser cancelados.')
        }

        if (appointment.client && appointment.client.id != clientId) {
            return new AppError('Este agendamento pertence a outro aluno(a).')
        }

        const canceledAppointment = await this.appointmentRepository.cancel({
            id: appointmentId,
            comments
        })

        return canceledAppointment
    }
}