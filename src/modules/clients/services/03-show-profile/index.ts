import { ClientRepository } from "../../../../data/client-repository";
import { Client } from "../../../../models/client";
import { AppError } from "../../../../providers/AppError";
import { TokenProvider } from "../../../../providers/Token";
import { UseCase } from "../../../../providers/UseCase";
import { Validator } from "../../../../providers/Validator";
import { CreateSessionDTO } from "../../dtos/create-sesion-dto";

type Response = Client | AppError
type Request = { id: number }

export class ShowProfile implements UseCase<Request, Response> {

    constructor(
        private clientRepository: ClientRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const client = await this.clientRepository.findById({ id: request.id, password: false })
        if (client === undefined) {
            return new AppError('Invalid client id')
        }

        return client
    }

}