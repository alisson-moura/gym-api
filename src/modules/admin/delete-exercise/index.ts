import { ExerciseRepository } from "../../../data/exercises-repository"
import { AppError } from "../../../providers/AppError"
import { UseCase } from "../../../providers/UseCase"

type Response = void | AppError
type Request = { id: number }

export class DeleteExercise implements UseCase<Request, Response> {

    constructor(
        private exerciseRepository: ExerciseRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const exercise = await this.exerciseRepository.findById(request.id)
        if (exercise == null) {
            return new AppError('Exercício não encontrado.')
        }

        await this.exerciseRepository.delete(request.id)
    }
}