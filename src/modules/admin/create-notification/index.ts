import { NotificationsRepository } from "../../../data/notifications-repository"
import { Notification } from "../../../models/Notifications"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"
import { CreateNotificationDTO } from "./dto"

type Response = Notification | AppError

export class CreateNotification implements UseCase<CreateNotificationDTO, Response> {

    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: CreateNotificationDTO): Promise<Response> {
        const notification = await this.notificationsRepository.create(request)
        return notification
    }
}