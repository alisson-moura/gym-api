import { ClientRepository } from "../../../../data/client-repository";
import { Client } from "../../../../models/client";
import { AppError } from "../../../../providers/AppError";
import { UseCase } from "../../../../providers/UseCase";
import { Validator } from "../../../../providers/Validator";
import { UpdateAccountDTO } from "../../dtos/update-account-dto";

type Response = Client | AppError

export class UpdateAccount implements UseCase<UpdateAccountDTO, Response> {

    constructor(
        private clientRepository: ClientRepository
    ) { }

    async execute(request: UpdateAccountDTO): Promise<Response> {
        const validateRequiredFields = Validator.requiredFields(['id', 'name', 'email', 'gender', 'badge'], request)
        if (validateRequiredFields) {
            return new AppError(validateRequiredFields)
        }
        if (request.gender != 'm' && request.gender != 'f') {
            return new AppError('Field gender accept values: m or f')
        }

        const client = await this.clientRepository.findById({ id: request.id, password: false })
        if (client === undefined) {
            return new AppError('Invalid client id')
        }

        const emailIsAlreadyInUse = await this.clientRepository.findByEmail(request.email)
        if (emailIsAlreadyInUse && emailIsAlreadyInUse.id != client.id) {
            return new AppError('Email in use by another user')
        }

        if (request.badge) {
            const badgeIsAlreadyInUse = await this.clientRepository.findByBadge(request.badge)
            if (badgeIsAlreadyInUse && badgeIsAlreadyInUse.id != client.id) {
                return new AppError('Badge in use by another user')
            }
        }
        const updatedClient = await this.clientRepository.update(request)
        return updatedClient
    }

}