import { PresenceToken } from "../models/PresenceToken";

export interface PresenceTokenRepository {
    create: (token: string) => Promise<PresenceToken>
    find: () => Promise<PresenceToken | null>
}