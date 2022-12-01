import { ClientRepository } from "../../../../data/client-repository";
import { AppError } from "../../../../providers/AppError";
import { UseCase } from "../../../../providers/UseCase";
import { AddPhotoDTO } from "../../dtos/add-photo-dto";

type Response = void | AppError

export class AddProfilePhoto implements UseCase<AddPhotoDTO, Response> {

    constructor(
        private clientRepository: ClientRepository,
    ) { }

    async execute(request: AddPhotoDTO): Promise<Response> {
        const { filename, clientId } = request
        const client = await this.clientRepository.findById({ id: clientId, password: false })

        if (client === undefined) {
            return new AppError('Invalid user')
        }

        await this.clientRepository.updatePhoto({ filename, clientId })
    }

}