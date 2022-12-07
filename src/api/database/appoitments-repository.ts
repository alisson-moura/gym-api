import { prisma } from '.';
import { AppoitmentRepository } from '../../data/appoitments-repository';
import { Appointment } from '../../models/appointment';
import { CreateAppointmentDTO } from '../../modules/appointments/dtos/create-appointment-dto';

export class PrismaAppointmentRepository implements AppoitmentRepository {
    async confirm(data: { id: number }): Promise<Appointment> {
        const appointment = await prisma.appointment.update({
            where: {
                id: data.id
            },
            data: {
                status: 'Concluído',
                confirmedIn: new Date()
            }
        })
        return appointment
    }
    async cancel(data: { id: number; comments?: string | undefined; }): Promise<Appointment> {
        const appointment = await prisma.appointment.update({
            where: {
                id: data.id
            },
            data: {
                comments: data.comments,
                status: 'Cancelado',
                canceledAt: new Date()
            }
        })
        return appointment
    }
    async findById(id: number): Promise<Appointment | undefined> {
        const appointment = await prisma.appointment.findUnique({ where: { id } })
        if (appointment)
            return appointment
        return undefined
    }
    async create(data: CreateAppointmentDTO): Promise<Appointment> {
        const appointment = await prisma.appointment.create({
            data: {
                date: data.date,
                clientId: data.clientId,
                hour: data.hour
            }
        })
        return appointment
    }
    async findAll(date: Date): Promise<Appointment[]> {
        const startDay = new Date(date)
        startDay.setHours(0, 0, 0, 0)
        const endDay = new Date(date)
        endDay.setHours(23, 59, 59, 0)
        const appointments = await prisma.appointment.findMany({
            where: {
                date: {
                    gte: startDay,
                    lt: endDay
                }
            },
            include: {
                client: true
            },
            orderBy: {
                hour: 'asc'
            }
        })
        return appointments
    }
    async findByClientId(id: number): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({ where: { clientId: id }, orderBy: { date: 'desc' } })
        return appointments
    }
}