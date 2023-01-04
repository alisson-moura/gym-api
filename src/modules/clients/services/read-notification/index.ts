import { ClientRepository } from "../../../../data/client-repository";
import { UseCase } from "../../../../providers/UseCase";

type Response = void
type Request = { clientId: number }

export class ReadNotification implements UseCase<Request, Response> {

    constructor(
        private clientRepository: ClientRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const { clientId } = request
        await this.clientRepository.readNotificationById(clientId)
    }

}