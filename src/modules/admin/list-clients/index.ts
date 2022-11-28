import { ClientRepository } from "../../../data/client-repository"
import { Client } from "../../../models/client"
import { UseCase } from "../../../providers/UseCase"

type Response = { clients: Client[] }

export class ListClients implements UseCase<any, Response> {

    constructor(
        private clientRepository: ClientRepository,
    ) { }

    async execute(): Promise<Response> {
        const clients = await this.clientRepository.all()
        return { clients }
    }
}