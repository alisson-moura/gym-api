import { AppoitmentRepository } from "../../../../data/appoitments-repository"
import { ClientRepository } from "../../../../data/client-repository"
import { Appointment } from "../../../../models/appointment"
import { Schedule } from "../../../../models/schedule"
import { AppError } from "../../../../providers/AppError"
import { DateProvider } from "../../../../providers/Date"
import { UseCase } from "../../../../providers/UseCase"
import { CreateAppointmentDTO } from "../../dtos/create-appointment-dto"

type Response = Appointment | AppError

export class NewAppointment implements UseCase<CreateAppointmentDTO, Response> {

    constructor(
        private appointmentRepository: AppoitmentRepository,
        private clientRepository: ClientRepository,
        private dateProvider: DateProvider,
    ) { }

    async execute(request: CreateAppointmentDTO): Promise<Response> {
        const { date, clientId, hour } = request

        // get appointment day
        const appointmentDay = new Date(date)
        appointmentDay.setHours(hour, 0, 0)

        // get actual day on 00:00
        const day = new Date()
        day.setHours(0, 0, 0, 0)

        // verifica se o dia do agendamento é antes que o dia atual
        if (this.dateProvider.isBefore(appointmentDay, new Date())) {
            return new AppError('Only future dates are accepted')
        }

        // get available hours for new appoitments
        const schedule = new Schedule()
        let appoitments = await this.appointmentRepository.findAll(date)
        appoitments = appoitments.filter(appoitment => appoitment.status == 'Pendente')
        const appLimit = schedule.hours.map(h => ({ hour: h, amount: 0 }))
        appoitments.forEach(app => {
            const hour = app.hour
            const index = appLimit.findIndex(al => al.hour == hour)
            appLimit[index].amount += 1
        })
        const availableHours = appLimit
            .filter(al => al.amount < schedule.limit && al.hour > new Date().getHours())
            .map(al => al.hour)
        if (!availableHours.includes(hour)) {
            return new AppError('Hour not available for appointment')
        }

        // verifica o id do cliente
        const client = await this.clientRepository.findById({ id: clientId, password: false })
        if (client === undefined) {
            return new AppError('Invalid client id')
        }

        // verifica se o cliente pode realizar novos agendamentos
        const clientAppointments = await this.appointmentRepository.findByClientId(clientId)
        const pendingClientAppointments = clientAppointments.filter(item => item.status == 'Pendente')


        const futureAppointment = pendingClientAppointments.some(item => {
            item.date.setHours(item.hour)
            return this.dateProvider.isAfter(item.date, appointmentDay)
        })
        if (futureAppointment) {
            return new AppError('An appointment already exists for this client')
        }

        if (pendingClientAppointments.some(item => this.dateProvider.differenceInHours(appointmentDay, item.date) <= 48))
            return new AppError('Client is not able to make new appointments')

        date.setHours(0, 0, 0)
        const newAppointment = await this.appointmentRepository.create({
            clientId,
            date,
            hour
        })
        return newAppointment
    }
}