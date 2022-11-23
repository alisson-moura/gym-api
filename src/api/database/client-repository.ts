import { prisma } from '.';
import { ClientRepository } from '../../data/client-repository'
import { Client } from '../../models/client';
import { CreateAccountDTO } from '../../modules/clients/dtos/create-client-dto';
import { UpdateAccountDTO } from '../../modules/clients/dtos/update-account-dto';


export class PrismaClientRepository implements ClientRepository {
    async create(data: CreateAccountDTO): Promise<void> {
        await prisma.client.create({
            data: {
                email: data.email,
                gender: data.gender,
                name: data.name,
                password: data.password,
                badge: data.badge
            }
        })
    }
    async findByEmail(email: string): Promise<Client | undefined> {
        const client = await prisma.client.findUnique({
            where: {
                email
            }
        })
        if (client != null) {
            return client
        }
        return undefined
    }
    async findByBadge(badge: number): Promise<Client | undefined> {
        const client = await prisma.client.findFirst({
            where: {
                badge
            }
        })
        if (client != null) {
            return client
        }
        return undefined
    }
    async findById(data: { id: number; password: boolean; }): Promise<Client | undefined> {
        const client = await prisma.client.findUnique({
            where: {
                id: data.id
            }
        })
        if (client != null) {
            return client
        }
        return undefined
    }
    async update (data: UpdateAccountDTO): Promise<Client> {
        const updateUser = await prisma.client.update({
            where: {
                id: data.id
            },
            data: {
                badge: data.badge,
                birthDate: data.birthDate,
                comments: data.comments,
                email: data.email,
                gender: data.gender,
                name: data.name,
                photo: data.photo   
            }
        })
        return updateUser
    }
}