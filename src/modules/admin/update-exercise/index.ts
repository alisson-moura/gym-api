import { ExerciseRepository } from "../../../data/exercises-repository"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"
import { UpdateExerciseDTO } from "./dto"

type Response = void | AppError

export class UpdateExercise implements UseCase<UpdateExerciseDTO, Response> {

    constructor(
        private exerciseRepository: ExerciseRepository
    ) { }

    async execute(request: UpdateExerciseDTO): Promise<Response> {
        const exercise = await this.exerciseRepository.findById(request.id)

        if(exercise == null) {
            return new AppError('Exercíco informado é inválido.')
        }

        const verifyName = await this.exerciseRepository.findByName(request.name)
        if (verifyName != null && verifyName.id != exercise.id ) {
            return new AppError('Já existe um exercício com este nome.')
        }

        await this.exerciseRepository.update({
            url: request.url,
            name: request.name,
            cover: request.cover || exercise.cover,
            description: request.description,
            id: request.id
        })
    }
}