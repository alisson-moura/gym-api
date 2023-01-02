import { NotificationsRepository } from "../../../../data/notifications-repository"
import { Notification } from "../../../../models/Notifications"
import { UseCase } from "../../../../providers/UseCase"

type Response = { notifications: Notification[] }
type Request = { page?: number }

export class ListAllNotification implements UseCase<Request, Response> {

    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        let { page } = request
        page = page ? page : 1
        const notifications = await this.notificationsRepository.findAll(page)
        return {
            notifications
        }
    }
}