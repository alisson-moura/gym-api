import { AppoitmentRepository } from "../../../data/appoitments-repository"
import { ScheduleRepository } from "../../../data/schedule-repository"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"

type Response = void 
type Request = { date: Date, description: string }

export class BlockDate implements UseCase<Request, Response> {

    constructor(
        private scheduleRepository: ScheduleRepository,
    ) { }

    async execute(request: Request): Promise<Response> {
        await this.scheduleRepository.blockDate(request)
    }
}