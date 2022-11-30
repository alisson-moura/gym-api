import { ClientRepository } from "../../../../data/client-repository";
import { AppError } from "../../../../providers/AppError";
import { Encrypter } from "../../../../providers/Encrypter";
import { UseCase } from "../../../../providers/UseCase";
import { Validator } from "../../../../providers/Validator";
import { CreateAccountDTO } from "../../dtos/create-client-dto";

type Response = AppError | void


export class CreateAccount implements UseCase<CreateAccountDTO, Response> {

    constructor(
        private clientRepository: ClientRepository,
        private encrypter: Encrypter
    ) { }

    async execute(request: CreateAccountDTO): Promise<Response> {
        const validadeRequiredFields = Validator.requiredFields(['name', 'email', 'password', 'confirmPassword', 'gender', 'company'], request)
        const validatePassword = Validator.minLengthField(6, { name: 'password', value: request.password })
        const validateConfirmPassword = Validator.equalFields([{ name: 'password', value: request.password }, { name: 'confirmPassword', value: request.confirmPassword }])

        if (validadeRequiredFields) {
            return new AppError(validadeRequiredFields)
        }
        if (validatePassword) {
            return new AppError(validatePassword)
        }
        if (validateConfirmPassword) {
            return new AppError(validateConfirmPassword)
        }
        if (request.gender != 'm' && request.gender != 'f') {
            return new AppError('Field gender accept values: m or f')
        }

        const emailIsAlreadyInUse = await this.clientRepository.findByEmail(request.email)
        if (emailIsAlreadyInUse) {
            return new AppError('Email in use by another user')
        }

        if (request.badge) {
            const badgeIsAlreadyInUse = await this.clientRepository.findByBadge(request.badge)
            if (badgeIsAlreadyInUse) {
                return new AppError('Badge in use by another user')
            }
        }

        request.password = this.encrypter.encrypt(request.password)

        await this.clientRepository.create(request)
    }
}
