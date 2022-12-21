import { ClientRepository } from "../../../data/client-repository"
import { Client } from "../../../models/client"
import { UseCase } from "../../../providers/UseCase"

type Response = { clients: Client[] }
type Request = { page?: number, search?: string | number }
export class ListClients implements UseCase<Request, Response> {

    constructor(
        private clientRepository: ClientRepository,
    ) { }

    async execute(request: Request): Promise<Response> {
        const page = request.page || 0
        const search = request.search as any

        if (search) {
            if (!isNaN(search)) {
                const clients = await this.clientRepository.findByBadge(parseInt(search))
                return { clients: [clients!] }
            }

            const clients = await this.clientRepository.findAllByName(page, search)
            return { clients }
        }

        const clients = await this.clientRepository.all(page)
        return { clients }
    }
}