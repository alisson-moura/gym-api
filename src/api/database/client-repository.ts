import { prisma } from '.';
import { ClientRepository } from '../../data/client-repository'
import { Client } from '../../models/client';
import { Client as PrismaClient, Groups } from '@prisma/client';
import { Group } from '../../models/Group';
import { UpdatePasswordDTO } from '../../modules/admin/reset-password/dto';
import { AcceptTermDTO } from '../../modules/clients/dtos/accept-term-dto';
import { AddPhotoDTO } from '../../modules/clients/dtos/add-photo-dto';
import { CreateAccountDTO } from '../../modules/clients/dtos/create-client-dto';
import { UpdateAccountDTO } from '../../modules/clients/dtos/update-account-dto';
import { databasePagination } from './pagination';

export class PrismaClientRepository implements ClientRepository {

    public static mapper(props: { data: PrismaClient & { group: Groups | null } }): Client {
        const { data } = props
        const client = new Client()
        if (data.group != null) {
            const item = data.group
            const group = new Group({
                id: item.id,
                description: item?.description,
                isPaying: item?.isPaying,
                name: item?.name
            })
            client.group = group
        }

        client.name = data.name
        client.id = data.id
        client.email = data.email
        client.password = data.password
        client.badge = data.badge
        client.photo = data.photo
        client.comments = data.comments
        client.birthDate = data.birthDate
        client.gender = data.gender
        client.status = data.status
        client.height = data.height
        client.weight = data.weight
        client.company = data.company

        return client
    }

    async unreadNotificationByAll(): Promise<void> {
        await prisma.client.updateMany({
            data: {
                notificationStatus: 'unread'
            }
        })
    }

    async readNotificationById(id: number): Promise<void> {
        await prisma.client.update({
            where: { id },
            data: {
                notificationStatus: 'read'
            }
        })
    }

    unreadNotificationById: (id: number) => Promise<void>;
    async findAllByName(page: number, name: string): Promise<Client[]> {
        const { skip, take } = databasePagination(page)
        const clients = await prisma.client.findMany({
            take,
            skip,
            where: {
                name: {
                    contains: name
                }
            },
            orderBy: {
                id: 'asc'
            },
            include: {
                group: true
            }
        })

        const data = clients.map(client => {
            const item = new Client()
            item.id = client.id
            item.badge = client.badge
            item.birthDate = client.birthDate
            item.comments = client.comments
            item.company = client.company
            item.email = client.email
            item.group = new Group({
                description: client.group!.description,
                id: client.group!.id,
                name: client.group!.name,
                isPaying: client.group!.isPaying
            })
            return item
        })

        return data
    }

    async all(page: number): Promise<Client[]> {
        const { skip, take } = databasePagination(page)
        const data = await prisma.client.findMany({
            take,
            skip,
            orderBy: {
                id: 'asc'
            },
            include: {
                group: true
            }
        })
        const clients = data.map(item => PrismaClientRepository.mapper({ data: item }))
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
        const data = await prisma.client.findUnique({
            where: {
                email
            },
            include: { group: true }
        })
        if (data != null) {
            const client = PrismaClientRepository.mapper({ data })
            return client
        }
        return undefined
    }

    async findByBadge(badge: number): Promise<Client | undefined> {
        const data = await prisma.client.findFirst({
            where: {
                badge
            },
            include: { group: true }
        })
        if (data != null) {
            const client = PrismaClientRepository.mapper({ data })
            return client
        }
        return undefined
    }

    async findById(item: { id: number; password: boolean; }): Promise<Client | undefined> {
        const data = await prisma.client.findUnique({
            where: {
                id: item.id
            },
            include: { group: true }
        })
        if (data != null) {
            const client = PrismaClientRepository.mapper({ data })
            return client
        }
        return undefined
    }

    async update(data: UpdateAccountDTO): Promise<Client> {
        const group = await prisma.groups.findFirst({ where: { name: data.group } })

        if (group) {
            await prisma.client.update({
                where: {
                    id: data.id
                },
                data: {
                    groupId: group.id
                }
            })
        }

        const user = await prisma.client.findFirst({where: {id: data.id }})
        const updateUser = await prisma.client.update({
            where: {
                id: data.id
            },
            data: {
                badge: data.badge || user?.badge,
                birthDate: data.birthDate || user?.birthDate,
                comments: data.comments || user?.comments,
                email: data.email || user?.email,
                gender: data.gender || user?.gender,
                name: data.name || user?.name,
                height: data.height || user?.height,
                weight: data.weight || user?.weight,
                company: data.company || user?.company
            },
            include: { group: true }
        })
        const client = PrismaClientRepository.mapper({ data: updateUser })
        return client
    }

    async updatePassword(data: UpdatePasswordDTO): Promise<Client> {
        const updateUser = await prisma.client.update({
            where: {
                id: data.id
            },
            data: {
                password: data.password
            },
            include: { group: true }
        })
        const client = PrismaClientRepository.mapper({ data: updateUser })
        return client
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