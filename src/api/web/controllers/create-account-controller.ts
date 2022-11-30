import { Request, Response } from "express";
import { CreateAccount } from "../../../modules/clients/services/01-create-account";
import { AppError } from "../../../providers/AppError";
import { PrismaClientRepository } from "../../database/client-repository";
import { EncrypterProvider } from "../../providers/EncrypterProvider";
import { BaseController } from "./base-controller";

class CreateAccountController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.body
        const createAccountService = new CreateAccount(new PrismaClientRepository(), new EncrypterProvider())
        const result = await createAccountService.execute(data)
        if (result instanceof AppError)
            return this.clientError(res, result.message)
        return this.ok(res)
    }

}

export default new CreateAccountController()