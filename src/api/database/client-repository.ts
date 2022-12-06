import { prisma } from '.';
import { ClientRepository } from '../../data/client-repository'
import { Client } from '../../models/client';
import { AcceptTermDTO } from '../../modules/clients/dtos/accept-term-dto';
import { AddPhotoDTO } from '../../modules/clients/dtos/add-photo-dto';
import { CreateAccountDTO } from '../../modules/clients/dtos/create-client-dto';
import { UpdateAccountDTO } from '../../modules/clients/dtos/update-account-dto';
import { databasePagination } from './pagination';

export class PrismaClientRepository implements ClientRepository {
    async all(page: number): Promise<Client[]> {
        const {skip, take} = databasePagination(page)
        const clients = await prisma.client.findMany({
            take,
            skip
        })
        return clients
    }
    async create(data: CreateAccountDTO): Promise<void> {
        const lastTerm = await prisma.term.findFirst({ where: { isActive: true } })
        if (lastTerm) {
            await prisma.client.create({
                data: {
                    email: data.email,
                    gender: data.gender,
                    name: data.name,
                    password: data.password,
                    badge: data.badge,
                    termId: lastTerm.id,
                    company: data.company
                }
            })
            return
        }
        throw new Error('No term available')
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
    async update(data: UpdateAccountDTO): Promise<Client> {
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
                photo: data.photo,
                height: data.height,
                weight: data.weight,
                company: data.company
            }
        })
        return updateUser
    }
    async acceptTerm(data: AcceptTermDTO): Promise<void> {
        await prisma.client.update({
            where: {
                id: data.clientId
            },
            data: {
                termStatus: "accepted"
            }
        })
    }
    async updatePhoto(data: AddPhotoDTO): Promise<void> {
        await prisma.client.update({
            where: {
                id: data.clientId
            },
            data: {
                photo: data.filename
            }
        })
    }
}