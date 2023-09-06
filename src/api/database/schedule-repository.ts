import { prisma } from ".";
import { ScheduleRepository } from "../../data/schedule-repository";

export class PrismaScheduleRepository implements ScheduleRepository {
    async blockDate(request: { date: Date; description: string; }): Promise<void> {
        const { date, description } = request
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)

        await prisma.schedule.create({
            data: {
                date,
                status: 'blocked',
                description
            }
        })
    }

    async findByDate(date: Date): Promise<{ date: Date; status: string; description: string } | null> {
        date.setHours(0, 0 , 0, 0)
        const result = await prisma.schedule.findUnique({ where: { date } })
        return result
    }
}