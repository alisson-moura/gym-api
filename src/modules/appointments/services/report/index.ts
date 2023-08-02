import { AppoitmentRepository } from "../../../../data/appoitments-repository"
import { Appointment } from "../../../../models/appointment"
import { DateProvider } from "../../../../providers/Date"
import { UseCase } from "../../../../providers/UseCase"

type Response = Appointment[]

type Request = {
    startDate: string
    endDate: string
}

export class AppointmentReportService implements UseCase<Request, Response> {
    constructor(
        private appointmentRepository: AppoitmentRepository,
        private dateProvider: DateProvider
    ) { }

    async execute(request: Request): Promise<Response> {
        const { startDate, endDate } = request
        const [start, end] = [
            new Date(startDate),
            this.dateProvider.addOneDay(new Date(endDate))
        ]
        const report = await this.appointmentRepository.report({ startDate: start, endDate: end })
       
        return report
    }
}