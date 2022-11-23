import { AppoitmentRepository } from "../../../../data/appoitments-repository"
import { Appointment } from "../../../../models/appointment"
import { UseCase } from "../../../../providers/UseCase"

type Response = Appointment[]
type Request = { id: number }

export class ShowClientAppointments implements UseCase<Request, Response> {

    constructor(
        private appointmentRepository: AppoitmentRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const { id } = request
        const appointments = await this.appointmentRepository.findByClientId(id)
        return appointments
    }
}