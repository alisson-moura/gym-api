import { AppoitmentRepository } from "../../../../data/appoitments-repository"
import { Appointment } from "../../../../models/appointment"
import { UseCase } from "../../../../providers/UseCase"

type Response = Appointment[]
type Request = { date: Date }

export class ShowAllAppointments implements UseCase<Request, Response> {

    constructor(
        private appointmentRepository: AppoitmentRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const { date } = request
        const appointments = await this.appointmentRepository.findAll(date)
        return appointments
    }
}