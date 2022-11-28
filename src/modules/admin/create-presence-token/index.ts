import { PresenceTokenRepository } from "../../../data/presence-token-repository"
import { PresenceToken } from "../../../models/PresenceToken"
import { TokenProvider } from "../../../providers/Token"
import { UseCase } from "../../../providers/UseCase"


type Response = PresenceToken

export class CreatePresenceToken implements UseCase<any, Response> {

    constructor(
        private tokenProvider: TokenProvider,
        private presenceTokenRepository: PresenceTokenRepository
    ) { }

    async execute(): Promise<Response> {
        const token = this.tokenProvider.create(Math.random() * 10)
        const presenceToken = await this.presenceTokenRepository.create(token)
        return presenceToken
    }
}