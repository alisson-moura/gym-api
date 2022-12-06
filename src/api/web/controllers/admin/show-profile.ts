import { Request, Response } from "express";
import { PrismaAdminRepository } from "../../../database/admin-repository";
import { BaseController } from "../base-controller";

class ShowProfileController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const repository = new PrismaAdminRepository()
        const userId = req.userId
        const user = await repository.findById(userId)
        if (user) {
            delete user.password
            return this.ok(res, user)
        }

        return this.clientError(res, 'User not found')
    }
}

export default new ShowProfileController()