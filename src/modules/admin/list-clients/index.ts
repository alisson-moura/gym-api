import { ClientRepository } from "../../../data/client-repository"
import { Client } from "../../../models/client"
import { UseCase } from "../../../providers/UseCase"

type Response = { clients: Client[] }
type Request = { page?: number }
export class ListClients implements UseCase<Request, Response> {

    constructor(
        private clientRepository: ClientRepository,
    ) { }

    async execute(request: Request): Promise<Response> {
        const page = request.page || 0
        const clients = await this.clientRepository.all(page)
        return { clients }
    }
}