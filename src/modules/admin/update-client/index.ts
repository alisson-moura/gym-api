import { ClientRepository } from "../../../data/client-repository"
import { Client } from "../../../models/client"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"
import { UpdateClientDTO } from "./dto"


type Response = Client | AppError

export class UpdateClient implements UseCase<UpdateClientDTO, Response> {

    constructor(
        private clientRepository: ClientRepository
    ) { }

    async execute(request: UpdateClientDTO): Promise<Response> {
        if (request.gender != 'm' && request.gender != 'f') {
            return new AppError('O campo genêro aceita os valores: masculino ou feminino.')
        }

        const client = await this.clientRepository.findById({ id: request.id, password: false })
        if (client === undefined) {
            return new AppError('Aluno(a) não encontrado.')
        }

        const emailIsAlreadyInUse = await this.clientRepository.findByEmail(request.email)
        if (emailIsAlreadyInUse && emailIsAlreadyInUse.id != client.id) {
            return new AppError('E-mail já está em uso por outro aluno(a).')
        }

        if (request.badge) {
            const badgeIsAlreadyInUse = await this.clientRepository.findByBadge(request.badge)
            if (badgeIsAlreadyInUse && badgeIsAlreadyInUse.id != client.id) {
                return new AppError('Código já está em uso por outro aluno(a).')
            }
        }
        
        const updatedClient = await this.clientRepository.update(request)
        return updatedClient
    }

}