import { prisma } from '.';
import { ClientRepository } from '../../data/client-repository'
import { Groups } from '@prisma/client';
import { Group } from '../../models/Group';

export class PrismaGroupRepository {

    private mapper(data: Groups): Group {
        const group = new Group({
            id: data.id,
            description: data.description,
            isPaying: data.isPaying,
            name: data.name
        })
        return group
    }

    async all(): Promise<Group[]> {
        const data = await prisma.groups.findMany()
        const groups = data.map(item => this.mapper(item))
        return groups
    }
}