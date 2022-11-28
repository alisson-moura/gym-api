import { Request, Response } from "express";
import { ShowPresenceToken } from "../../../../modules/admin/show-presence-token";
import { PrismaPresenceTokenRepository } from "../../../database/presence-token-repository";
import { BaseController } from "../base-controller";

class ShowPresenceTokenController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const service = new ShowPresenceToken( new PrismaPresenceTokenRepository())
        const result = await service.execute()
        return this.ok(res, result)
    }
}

export default new ShowPresenceTokenController()