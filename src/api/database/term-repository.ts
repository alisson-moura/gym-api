import { prisma } from '.';
import { TermRepository } from '../../data/term-repository';
import { Term } from '../../models/term';

export class PrismaTermRepository implements TermRepository {
    async findById(id: number): Promise<Term | undefined> {
        const term = await prisma.term.findUnique({ where: { id } })
        if (term)
            return term
        return undefined
    }
}