import { ClientRepository } from "../../../../data/client-repository";
import { TermRepository } from "../../../../data/term-repository";
import { AppError } from "../../../../providers/AppError";
import { UseCase } from "../../../../providers/UseCase";
import { AcceptTermDTO } from "../../dtos/accept-term-dto";

type Response = void | AppError

export class AcceptTerm implements UseCase<AcceptTermDTO, Response> {

    constructor(
        private clientRepository: ClientRepository,
        private termRepository: TermRepository
    ) { }

    async execute(request: AcceptTermDTO): Promise<Response> {
        const { termId, clientId } = request
        const client = await this.clientRepository.findById({ id: clientId, password: false })
        const term = await this.termRepository.findById(termId)

        if (client === undefined || term === undefined) {
            return new AppError('Termo ou aluno(a) não encontrados.')
        }

        await this.clientRepository.acceptTerm({ termId, clientId })
    }

}