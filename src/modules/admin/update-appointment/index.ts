import { UseCase } from "../../../providers/UseCase"
import { AppoitmentRepository } from '../../../data/appoitments-repository'
import { AppError } from "../../../providers/AppError"
import { UpdateAppointmentDTO } from "./dto"
import { Appointment } from "../../../models/appointment"

type Response = Appointment | AppError

export class UpdateStatusAppointment implements UseCase<UpdateAppointmentDTO, Response> {

    constructor(
        private appointmentRepository: AppoitmentRepository,
    ) { }

    async execute(request: UpdateAppointmentDTO): Promise<Response> {
        const { status, id } = request

        const appointment = await this.appointmentRepository.findById(id)
        if (appointment === undefined) {
            return new AppError('Agendamento não encontrado.')
        }

        if (status == 'Concluído') {
            const app = await this.appointmentRepository.confirm({ id })
            return app
        }

        if (status == 'Cancelado') {
            const app = await this.appointmentRepository.cancel({ id })
            return app
        }

        if (status == 'Pendente') {
            const app = await this.appointmentRepository.pending({ id })
            return app
        }

        return appointment
    }
}