import { Request, Response } from "express";
import { ListAppointments } from "../../../../modules/admin/list-appointments";
import { AppError } from "../../../../providers/AppError";
import { PrismaAppointmentRepository } from "../../../database/appoitments-repository";
import { BaseController } from "../base-controller";


class ListAppointmentsController extends BaseController {
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const data = req.query as any
        
        const listService = new ListAppointments(new PrismaAppointmentRepository())
        const result = await listService.execute({ date: data.date })

        if (result instanceof AppError) {
            return this.clientError(res, result.message)
        }

        return this.ok(res, result)
    }

}

export default new ListAppointmentsController()