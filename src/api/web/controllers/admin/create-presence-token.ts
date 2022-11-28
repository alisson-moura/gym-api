import { Request, Response } from "express";
import { CreatePresenceToken } from "../../../../modules/admin/create-presence-token";
import { PrismaPresenceTokenRepository } from "../../../database/presence-token-repository";
import { JwtTokenProvider } from "../../../providers/JwtTokenProvider";
import { BaseController } from "../base-controller";

class CreatePresenceTokenController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const service = new CreatePresenceToken(new JwtTokenProvider(), new PrismaPresenceTokenRepository())
        const result = await service.execute()
        return this.ok(res, result)
    }
}

export default new CreatePresenceTokenController()