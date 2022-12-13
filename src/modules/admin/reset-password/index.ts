import { th } from "date-fns/locale"
import { ClientRepository } from "../../../data/client-repository"
import { AppError } from "../../../providers/AppError"
import { Encrypter } from "../../../providers/Encrypter"
import { UseCase } from "../../../providers/UseCase"

type Response = void | AppError
type Request = { id: number, password: string, confirmPassword: string }

export class ResetClientPassword implements UseCase<Request, Response> {

    constructor(
        private clientRepository: ClientRepository,
        private encrypter: Encrypter
    ) { }

    async execute(request: Request): Promise<Response> {
        if (request.password != request.confirmPassword) return new AppError('Senhas divergentes.')

        if (request.password.length < 6) return new AppError('Senhas devem ter no mínimo 6 digitos.')

        const client = await this.clientRepository.findById({ id: request.id, password: false })
        if (client === undefined) {
            return new AppError('Aluno(a) não encontrado.')
        }

        const hashedPassword = this.encrypter.encrypt(request.password)
        await this.clientRepository.updatePassword({
            id: request.id,
            confirmPassword: request.confirmPassword,
            password: hashedPassword
        })
    }
}