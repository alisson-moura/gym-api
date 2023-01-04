import { NotificationFiles, Notifications } from "@prisma/client"
import { prisma } from "."
import { NotificationsRepository } from "../../data/notifications-repository"
import { Notification } from "../../models/Notifications"
import { CreateNotificationDTO } from "../../modules/admin/Notifications/create-notification/dto"
import { databasePagination } from "./pagination"

export class PrismaNotificationsRepository implements NotificationsRepository {
    private mapper(data: Notifications & {
        files: NotificationFiles[];
    } | null): Notification | null {
        if (data == null) {
            return null
        }
        const notification = new Notification()
        notification.createdAt = new Date(data.createdAt)
        notification.id = data.id
        notification.text = data.text
        notification.title = data.title

        if (data.files) {
            notification.files = data.files.map(file => file.file)
        }

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
        const savedNotification = await prisma.notifications.findUnique({
            where: { id: notification.id },
            include: {
                files: true
            }
        })
        return this.mapper(savedNotification)!
    }
    async findById(id: number): Promise<Notification | null> {
        const notification = await prisma.notifications.findUnique({ where: { id }, include: {files: true} })

        if (notification) {
            const result = this.mapper(notification)
            return result
        }
        return null
    }
    async delete(id: number): Promise<void> {
        await prisma.notificationFiles.deleteMany({ where: { notificationId: id } })
        await prisma.notifications.delete({ where: { id } })
    }
    async findAll(page: number, limit?: number): Promise<Notification[]> {
        const { skip, take } = databasePagination(page, limit)
        const dbNotifications = await prisma.notifications.findMany({
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                files: true
            }
        })
        return dbNotifications.map(notification => this.mapper(notification)!)
    }
}