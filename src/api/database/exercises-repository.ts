import { prisma } from "."
import { ExerciseRepository } from "../../data/exercises-repository"
import { Exercise } from "../../models/Exercise"
import { MuscleGroup } from "../../models/MucleGroup"
import { CreateExerciseDTO } from "../../modules/admin/create-exercise/dto"


export class PrismaExerciseRepository implements ExerciseRepository {
    all: () => Promise<Exercise[]>
    async findByName(name: string): Promise<Exercise | null> {
        const result = await prisma.exercises.findFirst({ where: { name } })
        return result
    }
    async findGroupById(id: number): Promise<MuscleGroup | null> {
        const result = await prisma.muscleGroup.findFirst({ where: { id } })
        return result
    }
    findById: (id: number) => Promise<Exercise | null>
    async create(data: CreateExerciseDTO): Promise<void> {
        await prisma.exercises.create({
            data: {
                name: data.name,
                url: data.url,
                cover: data.cover,
                description: data.description,
                groupId: data.groupId
            }
        })
    }
}