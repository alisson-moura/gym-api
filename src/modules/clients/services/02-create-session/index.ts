import { ClientRepository } from "../../../../data/client-repository";
import { Client } from "../../../../models/client";
import { AppError } from "../../../../providers/AppError";
import { Encrypter } from "../../../../providers/Encrypter";
import { TokenProvider } from "../../../../providers/Token";
import { UseCase } from "../../../../providers/UseCase";
import { Validator } from "../../../../providers/Validator";
import { CreateSessionDTO } from "../../dtos/create-sesion-dto";

type Response = { token: string, client: Client } | AppError

export class CreateSession implements UseCase<CreateSessionDTO, Response> {

    constructor(
        private clientRepository: ClientRepository,
        private tokenProvider: TokenProvider,
        private encrypter: Encrypter
    ) { }

    async execute(request: CreateSessionDTO): Promise<Response> {
        const validateRequiredFields = Validator.requiredFields(['email', 'password'], request)
        const validatePasswordField = Validator.minLengthField(6, { name: 'password', value: request.password })
        const genericError = new AppError('Invalid email or password')

        if (validatePasswordField || validateRequiredFields) {
            return genericError
        }

        const client = await this.clientRepository.findByEmail(request.email)
        if (client === undefined) {
            return genericError
        }

        const passwordMatch = this.encrypter.compare(request.password, client.password!)
        if (passwordMatch === false) {
            return genericError
        }

        const token = this.tokenProvider.create(client.id!)
        delete client.password

        return { token, client }
    }

}