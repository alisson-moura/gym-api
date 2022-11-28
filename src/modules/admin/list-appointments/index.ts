import { AppoitmentRepository } from "../../../data/appoitments-repository"
import { Appointment } from "../../../models/appointment"
import { UseCase } from "../../../providers/UseCase"

type Response = { appointments: Appointment[] }
type Request = { date: Date }

export class ListAppointments implements UseCase<Request, Response> {

    constructor(
        private appointmentRepository: AppoitmentRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const appointments = await this.appointmentRepository.findAll(request.date)
        return { appointments }
    }
}