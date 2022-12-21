import { MuscleGroup } from "@prisma/client"
import { Exercise } from "../models/Exercise"
import { CreateExerciseDTO } from "../modules/admin/create-exercise/dto"
import { UpdateExerciseDTO } from "../modules/admin/update-exercise/dto"

export interface ExerciseRepository {
    all:() => Promise<Exercise[]>
    findByName:(name: string) => Promise<Exercise | null>
    findGroupById: (id: number) => Promise<MuscleGroup | null>
    findById: (id: number) => Promise<Exercise | null>
    create: (data: CreateExerciseDTO) => Promise<void>
    delete: (id: number) => Promise<void>
    update: (data: UpdateExerciseDTO)=> Promise<Exercise>
}