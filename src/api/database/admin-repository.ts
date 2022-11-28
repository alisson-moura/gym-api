import { prisma } from "."
import { AdminRepository } from "../../data/admin-repository"
import { Admin } from "../../models/Admin"


export class PrismaAdminRepository implements AdminRepository {
    async findByLogin(login: string): Promise<Admin | null> {
        const admin = await prisma.admin.findFirst({ where: { login } })
        return admin
    }
}