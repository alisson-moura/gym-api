import { AdminRepository } from "../../../data/admin-repository"
import { Admin } from "../../../models/Admin"
import { AppError } from "../../../providers/AppError"
import { Encrypter } from "../../../providers/Encrypter"
import { TokenProvider } from "../../../providers/Token"
import { UseCase } from "../../../providers/UseCase"
import { CreateSessionDTO } from "./dto"

type Response = { token: string, admin: Admin } | AppError

export class CreateSession implements UseCase<CreateSessionDTO, Response> {

    constructor(
        private adminRepository: AdminRepository,
        private tokenProvider: TokenProvider,
        private encrypter: Encrypter
    ) { }

    async execute(request: CreateSessionDTO): Promise<Response> {
        const genericError = new AppError('Usuário ou senha estão incorretos.')

        const admin = await this.adminRepository.findByLogin(request.login)
        if (admin === null) {
            return genericError
        }
        const passwordMatch = this.encrypter.compare(request.password, admin.password!)
        if (passwordMatch === false) {
            return genericError
        }

        const token = this.tokenProvider.create(admin.id)
        delete admin.password

        return { token, admin }
    }

}