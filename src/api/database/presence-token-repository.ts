import { prisma } from '.';
import { PresenceTokenRepository } from '../../data/presence-token-repository';
import { PresenceToken } from '../../models/PresenceToken';

export class PrismaPresenceTokenRepository implements PresenceTokenRepository {
    async find(): Promise<PresenceToken | null> {
        const result = await prisma.presenceToken.findFirst({ where: { isActive: true } })
        return result
    }

    async create(token: string): Promise<PresenceToken> {
        await prisma.presenceToken.updateMany({
            data: {
                isActive: false
            }
        })
        const result = await prisma.presenceToken.create({
            data: {
                token
            }
        })
        return result
    }
}