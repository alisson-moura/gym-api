import { ScheduleRepository } from "../../../data/schedule-repository"
import { UseCase } from "../../../providers/UseCase"

type Response = { date: Date, status: string, description: string }
type Request = { date: Date }

export class DateStatus implements UseCase<Request, Response> {

    constructor(
        private scheduleRepository: ScheduleRepository,
    ) { }

    async execute(request: Request): Promise<Response> {
        const result = await this.scheduleRepository.findByDate(request.date)
        if (result) {
            return {
               ...result
            }
        }
        return {
            date: request.date,
            status: "available",
            description: 'Disponível'
        }
    }
}