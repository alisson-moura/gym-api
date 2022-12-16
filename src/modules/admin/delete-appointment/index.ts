import { AppoitmentRepository } from "../../../data/appoitments-repository"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"

type Response = void | AppError
type Request = { appointmentId: number }

export class DeleteAppointment implements UseCase<Request, Response> {

    constructor(
        private appointmentRepository: AppoitmentRepository,
    ) { }

    async execute(request: Request): Promise<Response> {
        const appointment = await this.appointmentRepository.findById(request.appointmentId)
        if (appointment == undefined) {
            return new AppError('Agendamento informado não é válido')
        }

        await this.appointmentRepository.delete(request.appointmentId)
    }
}