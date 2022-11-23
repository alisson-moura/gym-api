import { isSameDay } from "date-fns"
import { AppoitmentRepository } from "../../../../data/appoitments-repository"
import { Schedule } from "../../../../models/schedule"
import { AppError } from "../../../../providers/AppError"
import { DateProvider } from "../../../../providers/Date"
import { UseCase } from "../../../../providers/UseCase"

type Response = number[] | AppError
type Request = { date: Date }

export class ShowAvailableAppointments implements UseCase<Request, Response> {

    constructor(
        private appointmentRepository: AppoitmentRepository,
        private dateProvider: DateProvider
    ) { }

    async execute(request: Request): Promise<Response> {
        const { date } = request
        const day = new Date()
        day.setHours(0, 0, 0, 0)

        if (this.dateProvider.isBefore(date, day)) {
            return new AppError('Date provided is invalid')
        }

        const schedule = new Schedule()
        const appoitments = await this.appointmentRepository.findAll(date)
        const appLimit = schedule.hours.map(h => ({ hour: h, amount: 0 }))
        appoitments.forEach(app => {
            const hour = app.date.getHours()
            const index = appLimit.findIndex(al => al.hour == hour)
            appLimit[index].amount += 1
        })

        /*TOD0: Refatorar para utilizar injeção de dependência */
        const availableHours = appLimit
            .filter(al => {
                if (isSameDay(date, new Date()))
                    return al.amount < schedule.limit && al.hour > new Date().getHours()
                return al.amount < schedule.limit
            })
            .map(al => al.hour)

        console.log(availableHours)


        return availableHours
    }
}