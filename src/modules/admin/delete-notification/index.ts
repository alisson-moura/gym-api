import { NotificationsRepository } from "../../../data/notifications-repository"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"

type Response = void | AppError
type Request = {id: number}

export class DeleteNotification implements UseCase<Request, Response> {

    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const notification = await this.notificationsRepository.findById(request.id)
        if(notification == null) {
            return new AppError('Notificação não encontrada')
        }
        await this.notificationsRepository.delete(request.id)
    }
}