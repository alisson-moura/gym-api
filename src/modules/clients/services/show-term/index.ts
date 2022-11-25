import { TermRepository } from "../../../../data/term-repository";
import { Term } from "../../../../models/term";
import { AppError } from "../../../../providers/AppError";
import { UseCase } from "../../../../providers/UseCase";

type Response = Term | AppError
type Request = { id: number }

export class ShowTerm implements UseCase<Request, Response> {

    constructor(
        private termRepository: TermRepository
    ) { }

    async execute(request: Request): Promise<Response> {
        const { id } = request
        const term = await this.termRepository.findById(id)

        if (term === undefined) {
            return new AppError('Invalid term id')
        }

        return term
    }

}