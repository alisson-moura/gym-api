import { prisma } from '.';
import { AppoitmentRepository } from '../../data/appoitments-repository';
import { Appointment } from '../../models/appointment';
import { CreateAppointmentDTO } from '../../modules/appointments/dtos/create-appointment-dto';
import { PrismaClientRepository } from './client-repository';

export class PrismaAppointmentRepository implements AppoitmentRepository {
    async delete(id: number): Promise<void> {
        await prisma.appointment.delete({ where: { id } })
    }
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
    async pending(data: { id: number; }): Promise<Appointment> {
        const appointment = await prisma.appointment.update({
            where: {
                id: data.id
            },
            data: {
                status: 'Pendente',
                canceledAt: new Date()
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
        const tr = await prisma.$transaction(async (tx) => {
            const { date, clientId, hour } = data
            
            const startDay = new Date(date)
            startDay.setHours(0, 0, 0, 0)
            const endDay = new Date(date)
            endDay.setHours(23, 59, 59, 0)

            const count = await prisma.appointment.count({
                where: {
                    hour: hour,
                    status: 'Pendente',
                    date: {
                        gte: startDay,
                        lt: endDay
                    }
                }
            })

            if (count > 20) {
                throw new Error('Horário não está disponível')
            }

            const appointment = await prisma.appointment.create({
                data: {
                    date: date,
                    clientId: clientId,
                    hour: hour
                }
            })
            return appointment
        })

        return tr
    }

    public static mapper(data: any): Appointment {
        const appointment = new Appointment()
        appointment.id = data.id
        appointment.client = PrismaClientRepository.mapper({ data: data.client })
        appointment.canceledAt = data.canceledAt
        appointment.comments = data.comments
        appointment.confirmedIn = data.confirmedIn
        appointment.createdAt = data.createdAt
        appointment.date = data.date
        appointment.hour = data.hour
        appointment.status = data.status
        return appointment
    }

    async findAll(date: Date, status?: string, hour?: number): Promise<Appointment[]> {
        const startDay = new Date(date)
        startDay.setHours(0, 0, 0, 0)
        const endDay = new Date(date)
        endDay.setHours(23, 59, 59, 0)

        if (status && hour) {
            const appointments = await prisma.appointment.findMany({
                where: {
                    date: {
                        gte: startDay,
                        lt: endDay
                    },
                    status: {
                        equals: status
                    },
                    hour: {
                        equals: hour
                    }
                },
                include: {
                    client: {
                        include: {
                            group: true
                        }
                    }
                },
                orderBy: {
                    hour: 'asc'
                }
            })
            return appointments.map(item => PrismaAppointmentRepository.mapper(item))
        }

        if (status) {
            const appointments = await prisma.appointment.findMany({
                where: {
                    date: {
                        gte: startDay,
                        lt: endDay
                    },
                    status: {
                        equals: status
                    }
                },
                include: {
                    client: {
                        include: {
                            group: true
                        }
                    }
                },
                orderBy: {
                    hour: 'asc'
                }
            })
            return appointments.map(item => PrismaAppointmentRepository.mapper(item))
        }

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
        return appointments.map(item => PrismaAppointmentRepository.mapper(item))
    }

    async findByClientId(id: number): Promise<Appointment[]> {
        const appointments = await prisma.appointment.findMany({ where: { clientId: id }, orderBy: { date: 'desc' } })
        return appointments
    }

    async report(data: { startDate: Date; endDate: Date; }): Promise<Appointment[]> {
        const start = data.startDate
        start.setHours(0, 0, 0, 0)
        const end = data.endDate
        end.setHours(23, 59, 59, 0)

        const appointments = await prisma.appointment.findMany({
            where: {
                date: {
                    gte: start,
                    lte: end
                },
            },
            include: { client: true }
        })

        return appointments.map(item => PrismaAppointmentRepository.mapper(item))
    }
}