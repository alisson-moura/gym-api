import { AppoitmentRepository } from "../../../data/appoitments-repository"
import { ClientRepository } from "../../../data/client-repository"
import { Appointment } from "../../../models/appointment"
import { Client } from "../../../models/client"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"

type Response = { client: Client, appointments: Appointment[] } | AppError
type Request = { id: number }

export class ListClientAppointment implements UseCase<Request, Response> {

    constructor(
        private clientRepository: ClientRepository,
        private appointmentRepository: AppoitmentRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const client = await this.clientRepository.findById({ id: request.id, password: false })
        if (client === undefined) {
            return new AppError('Aluno(a) não encontrado.')
        }

        const appointments = await this.appointmentRepository.findByClientId(request.id)

        return { client, appointments }
    }
}