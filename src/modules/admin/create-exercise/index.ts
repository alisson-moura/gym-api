import { ExerciseRepository } from "../../../data/exercises-repository"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"
import { CreateExerciseDTO } from "./dto"

type Response = void | AppError

export class CreateExercise implements UseCase<CreateExerciseDTO, Response> {

    constructor(
        private exerciseRepository: ExerciseRepository
    ) { }

    async execute(request: CreateExerciseDTO): Promise<Response> {
        const verifyName = await this.exerciseRepository.findByName(request.name)
        if (verifyName != null) {
            return new AppError('Já existe um exercício com este nome.')
        }

        request.groupId = Number(request.groupId)
        const verifyGroup = await this.exerciseRepository.findGroupById(request.groupId)
        if (verifyGroup == null) {
            return new AppError('Grupo informado é inválido.')
        }

        await this.exerciseRepository.create({
            groupId: request.groupId,
            url: request.url,
            name: request.name,
            cover: request.cover,
            description: request.description
        })
    }
}