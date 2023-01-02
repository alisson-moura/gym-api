import { Notification } from "../models/Notifications";
import { CreateNotificationDTO } from "../modules/admin/Notifications/create-notification/dto";

export interface NotificationsRepository {
    create: (data: CreateNotificationDTO) => Promise<Notification>
    findById: (id: number) => Promise<Notification | null>
    delete: (id: number) => Promise<void>
    findAll: (page: number) => Promise<Notification[]>
}