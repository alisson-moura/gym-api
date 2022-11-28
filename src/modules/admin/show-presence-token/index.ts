import { PresenceTokenRepository } from "../../../data/presence-token-repository"
import { PresenceToken } from "../../../models/PresenceToken"
import { TokenProvider } from "../../../providers/Token"
import { UseCase } from "../../../providers/UseCase"


type Response = PresenceToken | null

export class ShowPresenceToken implements UseCase<any, Response> {

    constructor(
        private presenceTokenRepository: PresenceTokenRepository
    ) { }

    async execute(): Promise<Response> {
        const presenceToken = await this.presenceTokenRepository.find()
        return presenceToken
    }
}