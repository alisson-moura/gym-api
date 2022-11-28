import { AdminRepository } from "../../../data/admin-repository"
import { Admin } from "../../../models/Admin"
import { AppError } from "../../../providers/AppError"
import { TokenProvider } from "../../../providers/Token"
import { UseCase } from "../../../providers/UseCase"
import { CreateSessionDTO } from "./dto"

type Response = { token: string, admin: Admin } | AppError

export class CreateSession implements UseCase<CreateSessionDTO, Response> {

    constructor(
        private adminRepository: AdminRepository,
        private tokenProvider: TokenProvider
    ) { }

    async execute(request: CreateSessionDTO): Promise<Response> {
        const genericError = new AppError('Invalid login or password')

        const admin = await this.adminRepository.findByLogin(request.login)
        if (admin === null) {
            return genericError
        }

        if (admin.password !== request.password) {
            return genericError
        }

        const token = this.tokenProvider.create(admin.id)
        delete admin.password

        return { token, admin }
    }

}