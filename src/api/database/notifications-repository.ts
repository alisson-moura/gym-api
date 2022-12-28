import { Notifications } from "@prisma/client"
import { prisma } from "."
import { NotificationsRepository } from "../../data/notifications-repository"
import { Notification } from "../../models/Notifications"
import { CreateNotificationDTO } from "../../modules/admin/create-notification/dto"

export class PrismaNotificationsRepository implements NotificationsRepository {
    private async mapper(data: Notifications): Promise<Notification> {
        const notification = new Notification()
        notification.createdAt = new Date(data.createdAt)
        notification.id = data.id
        notification.text = data.text
        notification.title = data.title

        const files = await prisma.notificationFiles.findMany({ where: { notificationId: data.id } })
        notification.files = files.map(file => file.file)

        return notification
    }
    async create(data: CreateNotificationDTO): Promise<Notification> {
        const { text, title, files } = data
        const notification = await prisma.notifications.create({ data: { text, title } })
        if (files) {
            await prisma.notificationFiles.createMany({
                data: files.map(file => {
                    return {
                        file,
                        notificationId: notification.id
                    }
                })
            })
        }
        return notification
    }
    async findById(id: number): Promise<Notification | null> {
        const notification = await prisma.notifications.findUnique({ where: { id } })

        if (notification) {
            const result = await this.mapper(notification)
            return result
        }
        return null
    }
    async delete(id: number): Promise<void> {
        await prisma.notificationFiles.deleteMany({ where: { notificationId: id } })
        await prisma.notifications.delete({ where: { id } })
    }
}