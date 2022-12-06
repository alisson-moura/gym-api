import { getDaysInMonth, lastDayOfMonth, setDate } from "date-fns"
import { prisma } from "."
import { AdminRepository } from "../../data/admin-repository"
import { Admin } from "../../models/Admin"


export class PrismaAdminRepository implements AdminRepository {
    async findByLogin(login: string): Promise<Admin | null> {
        const admin = await prisma.admin.findFirst({ where: { login } })
        return admin
    }
    async findById(id: number): Promise<Admin | null> {
        const admin = await prisma.admin.findFirst({ where: { id } })
        return admin
    }

    async statistics(): Promise<any> {
        const date = new Date()
        const firstDayInMonth = setDate(date, 1)
        const lastDayInMonth = lastDayOfMonth(date)

        const totalStudents = await prisma.client.count()
        const monthAppointments = await prisma.appointment.findMany({
            where: {
                date: {
                    gte: firstDayInMonth,
                    lte: lastDayInMonth
                }
            },
            include: {
                client: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return {
            totalStudents,
            monthAppointments
        }
    }
}