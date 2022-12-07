import { Request, Response } from "express";
import { ListClients } from "../../../../modules/admin/list-clients";
import { PrismaClientRepository } from "../../../database/client-repository";
import { BaseController } from "../base-controller";


class ListClientsController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const queryPage = req.query.page as any
        const querySearch = req.query.search as any 

        const listClientsService = new ListClients(new PrismaClientRepository())
        const result = await listClientsService.execute({ page: queryPage, search: querySearch })
        return this.ok(res, result)
    }

}

export default new ListClientsController()