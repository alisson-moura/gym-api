import { Request, Response } from "express";
import { ListClientAppointment } from "../../../../modules/admin/list-client-appointments";
import { ListClients } from "../../../../modules/admin/list-clients";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { PrismaClientRepository } from "../../../database/client-repository";
import { BaseController } from "../base-controller";


class ListClientAppointmentsController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id)
        const listService = new ListClientAppointment(new PrismaClientRepository(), new PrismaAppointmentRepository())
        const result = await listService.execute({ id })

        if (result instanceof AppError) {
            return this.clientError(res, result.message)
        }

        return this.ok(res, result)
    }

}

export default new ListClientAppointmentsController()